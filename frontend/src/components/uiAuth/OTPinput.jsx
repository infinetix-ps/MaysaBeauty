import { useMemo } from "react"
const RE_DIGIT = new RegExp(/^\d+$/)

function OtpInput({ value, valueLength, onChange }) {
    const valueItems = useMemo(() => {
        const valueArray = value.split("")
        const items = []

        for (let i = 0; i < valueLength; i++) {
            const char = valueArray[i]
            if (RE_DIGIT.test(char)) {
                items.push(char)
            } else {
                items.push("")
            }
        }

        return items
    }, [value, valueLength])

    const focusToNextInput = (target) => {
        const nextElementSibling = target.nextElementSibling
        if (nextElementSibling) {
            nextElementSibling.focus()
        }
    }

    const focusToPrevInput = (target) => {
        const previousElementSibling = target.previousElementSibling
        if (previousElementSibling) {
            previousElementSibling.focus()
        }
    }

    const inputOnChange = (e, idx) => {
        const target = e.target
        let targetValue = target.value.trim()
        const isTargetValueDigit = RE_DIGIT.test(targetValue)

        if (!isTargetValueDigit && targetValue !== "") {
            return
        }

        const nextInputEl = target.nextElementSibling

        if (!isTargetValueDigit && nextInputEl && nextInputEl.value !== "") {
            return
        }

        targetValue = isTargetValueDigit ? targetValue : " "

        const targetValueLength = targetValue.length

        if (targetValueLength === 1) {
            const newValue = value.substring(0, idx) + targetValue + value.substring(idx + 1)

            onChange(newValue)

            if (!isTargetValueDigit) {
                return
            }

            focusToNextInput(target)
        } else if (targetValueLength === valueLength) {
            onChange(targetValue)
            target.blur()
        }
    }

    const inputOnKeyDown = (e) => {
        const { key } = e
        const target = e.target

        if (key === "ArrowRight" || key === "ArrowDown") {
            e.preventDefault()
            return focusToNextInput(target)
        }

        if (key === "ArrowLeft" || key === "ArrowUp") {
            e.preventDefault()
            return focusToPrevInput(target)
        }

        const targetValue = target.value

        target.setSelectionRange(0, targetValue.length)

        if (e.key !== "Backspace" || targetValue !== "") {
            return
        }

        focusToPrevInput(target)
    }

    const inputOnFocus = (e) => {
        const { target } = e

        const prevInputEl = target.previousElementSibling

        if (prevInputEl && prevInputEl.value === "") {
            return prevInputEl.focus()
        }

        target.setSelectionRange(0, target.value.length)
    }

    return (
        <div className="flex gap-2">
            {valueItems.map((digit, idx) => (
                <input
                    key={idx}
                    type="text"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    pattern="\d{1}"
                    maxLength={valueLength}
                    className="w-12 h-12 text-center text-2xl font-bold text-text border border-tertiary rounded-lg focus:outline-none focus:ring-2 focus:ring-button focus:border-transparent bg-white"
                    value={digit}
                    onChange={(e) => inputOnChange(e, idx)}
                    onKeyDown={inputOnKeyDown}
                    onFocus={inputOnFocus}
                />
            ))}
        </div>
    )
}

export default OtpInput

