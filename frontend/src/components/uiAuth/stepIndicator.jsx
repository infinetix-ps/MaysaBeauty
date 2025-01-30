function StepIndicator({ steps, currentStep }) {
    return (
        <div className="flex justify-center items-center space-x-4 mb-8">
            {steps.map((step, index) => (
                <div key={step} className="flex items-center">
                    <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${index < currentStep
                                ? "bg-button text-white"
                                : index === currentStep
                                    ? "bg-secondary text-button border-2 border-button"
                                    : "bg-tertiary text-button"
                            }`}
                    >
                        {index < currentStep ? (
                            <i className="fas fa-check text-sm"></i>
                        ) : (
                            <span className="text-sm">{index + 1}</span>
                        )}
                    </div>
                    {index < steps.length - 1 && (
                        <div className={`w-12 h-0.5 ${index < currentStep ? "bg-button" : "bg-tertiary"}`}></div>
                    )}
                </div>
            ))}
        </div>
    )
}

export default StepIndicator

