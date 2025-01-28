import React, { createContext, useContext, useMemo, forwardRef, useId } from "react";
import * as RechartsPrimitive from "recharts";

const THEMES = { light: "", dark: ".dark" };

const ChartContext = createContext(null);

function useChart() {
    const context = useContext(ChartContext);

    if (!context) {
        throw new Error("useChart must be used within a <ChartContainer />");
    }

    return context;
}

const ChartContainer = forwardRef(({ id, className, children, config, ...props }, ref) => {
    const uniqueId = useId();
    const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`;

    return (
        <ChartContext.Provider value={{ config }}>
            <div
                data-chart={chartId}
                ref={ref}
                className={[
                    "flex aspect-video justify-center text-xs",
                    className,
                ].join(" ")}
                {...props}
            >
                <ChartStyle id={chartId} config={config} />
                <RechartsPrimitive.ResponsiveContainer>
                    {children}
                </RechartsPrimitive.ResponsiveContainer>
            </div>
        </ChartContext.Provider>
    );
});

const ChartStyle = ({ id, config }) => {
    const colorConfig = Object.entries(config).filter(
        ([, config]) => config.theme || config.color
    );

    if (!colorConfig.length) {
        return null;
    }

    return (
        <style
            dangerouslySetInnerHTML={{
                __html: Object.entries(THEMES)
                    .map(
                        ([theme, prefix]) => `
    ${prefix} [data-chart=${id}] {
    ${colorConfig
                                .map(([key, itemConfig]) => {
                                    const color =
                                        itemConfig.theme?.[theme] || itemConfig.color;
                                    return color ? `  --color-${key}: ${color};` : null;
                                })
                                .join("\n")}
    }`
                    )
                    .join("\n"),
            }}
        />
    );
};

const ChartTooltip = RechartsPrimitive.Tooltip;

const ChartTooltipContent = forwardRef(
    (
        {
            active,
            payload,
            className,
            indicator = "dot",
            hideLabel = false,
            hideIndicator = false,
            label,
            labelFormatter,
            labelClassName,
            formatter,
            color,
            nameKey,
            labelKey,
        },
        ref
    ) => {
        const { config } = useChart();

        const tooltipLabel = useMemo(() => {
            if (hideLabel || !payload?.length) {
                return null;
            }

            const [item] = payload;
            const key = `${labelKey || item.dataKey || item.name || "value"}`;
            const itemConfig = getPayloadConfigFromPayload(config, item, key);
            const value =
                !labelKey && typeof label === "string"
                    ? config[label]?.label || label
                    : itemConfig?.label;

            if (labelFormatter) {
                return (
                    <div className={["font-medium", labelClassName].join(" ")}>
                        {labelFormatter(value, payload)}
                    </div>
                );
            }

            if (!value) {
                return null;
            }

            return <div className={["font-medium", labelClassName].join(" ")}>{value}</div>;
        }, [
            label,
            labelFormatter,
            payload,
            hideLabel,
            labelClassName,
            config,
            labelKey,
        ]);

        if (!active || !payload?.length) {
            return null;
        }

        const nestLabel = payload.length === 1 && indicator !== "dot";

        return (
            <div
                ref={ref}
                className={[
                    "grid min-w-[8rem] items-start gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs shadow-xl",
                    className,
                ].join(" ")}
            >
                {!nestLabel ? tooltipLabel : null}
                <div className="grid gap-1.5">
                    {payload.map((item, index) => {
                        const key = `${nameKey || item.name || item.dataKey || "value"}`;
                        const itemConfig = getPayloadConfigFromPayload(config, item, key);
                        const indicatorColor = color || item.payload.fill || item.color;

                        return (
                            <div
                                key={item.dataKey}
                                className={[
                                    "flex w-full flex-wrap items-stretch gap-2",
                                    indicator === "dot" && "items-center",
                                ]
                                    .filter(Boolean)
                                    .join(" ")}
                            >
                                {formatter && item?.value !== undefined && item.name ? (
                                    formatter(item.value, item.name, item, index, item.payload)
                                ) : (
                                    <>
                                        {!hideIndicator && (
                                            <div
                                                className="shrink-0 rounded-[2px]"
                                                style={{ backgroundColor: indicatorColor }}
                                            />
                                        )}
                                        <div className="flex flex-1 justify-between leading-none">
                                            <div className="grid gap-1.5">
                                                {nestLabel ? tooltipLabel : null}
                                                <span>{itemConfig?.label || item.name}</span>
                                            </div>
                                            {item.value && (
                                                <span className="font-mono font-medium">
                                                    {item.value.toLocaleString()}
                                                </span>
                                            )}
                                        </div>
                                    </>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
);

const ChartLegend = RechartsPrimitive.Legend;

const ChartLegendContent = forwardRef(
    ({ className, hideIcon = false, payload, verticalAlign = "bottom", nameKey }, ref) => {
        const { config } = useChart();

        if (!payload?.length) {
            return null;
        }

        return (
            <div
                ref={ref}
                className={[
                    "flex items-center justify-center gap-4",
                    verticalAlign === "top" ? "pb-3" : "pt-3",
                    className,
                ].join(" ")}
            >
                {payload.map((item) => {
                    const key = `${nameKey || item.dataKey || "value"}`;
                    const itemConfig = getPayloadConfigFromPayload(config, item, key);

                    return (
                        <div key={item.value} className="flex items-center gap-1.5">
                            {itemConfig?.icon && !hideIcon ? (
                                <itemConfig.icon />
                            ) : (
                                <div
                                    className="h-2 w-2 shrink-0 rounded-[2px]"
                                    style={{ backgroundColor: item.color }}
                                />
                            )}
                            {itemConfig?.label}
                        </div>
                    );
                })}
            </div>
        );
    }
);

function getPayloadConfigFromPayload(config, payload, key) {
    if (typeof payload !== "object" || payload === null) {
        return undefined;
    }

    const payloadPayload = payload.payload;

    let configLabelKey = key;

    if (key in payload && typeof payload[key] === "string") {
        configLabelKey = payload[key];
    } else if (payloadPayload && key in payloadPayload && typeof payloadPayload[key] === "string") {
        configLabelKey = payloadPayload[key];
    }

    return config[configLabelKey] || config[key];
}

export {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    ChartLegend,
    ChartLegendContent,
    ChartStyle,
};
