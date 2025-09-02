import React from 'react';

/**
 * StepProgress Component
 * Componente elegante para exibir progresso em etapas com navegação visual
 */
const StepProgress = ({ 
  steps, 
  currentStep, 
  onStepClick = null,
  className = "",
  size = "normal" // "small", "normal", "large"
}) => {
  const sizeClasses = {
    small: {
      icon: "w-8 h-8",
      iconInner: "w-4 h-4",
      title: "text-xs",
      description: "text-xs",
      connector: "h-0.5"
    },
    normal: {
      icon: "w-12 h-12",
      iconInner: "w-6 h-6",
      title: "text-sm",
      description: "text-xs",
      connector: "h-1"
    },
    large: {
      icon: "w-16 h-16",
      iconInner: "w-8 h-8",
      title: "text-base",
      description: "text-sm",
      connector: "h-1.5"
    }
  };

  const sizes = sizeClasses[size];

  return (
    <div className={`w-full ${className}`}>
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const StepIcon = step.icon;
          const isActive = currentStep === step.id;
          const isCompleted = currentStep > step.id;
          const isClickable = onStepClick && typeof onStepClick === 'function';
          
          return (
            <div key={step.id} className="flex items-center flex-1">
              {/* Step Circle */}
              <div className="flex flex-col items-center">
                <div 
                  className={`${sizes.icon} rounded-full flex items-center justify-center transition-all duration-300 transform ${
                    isActive 
                      ? 'bg-blue-600 text-white shadow-lg scale-110 ring-4 ring-blue-100 dark:ring-blue-900/50' 
                      : isCompleted 
                      ? 'bg-green-600 text-white shadow-md hover:shadow-lg' 
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-600'
                  } ${
                    isClickable ? 'cursor-pointer hover:scale-105' : ''
                  }`}
                  onClick={() => isClickable && onStepClick(step.id)}
                  role={isClickable ? "button" : "presentation"}
                  tabIndex={isClickable ? 0 : -1}
                  onKeyDown={(e) => {
                    if (isClickable && (e.key === 'Enter' || e.key === ' ')) {
                      e.preventDefault();
                      onStepClick(step.id);
                    }
                  }}
                >
                  {isCompleted ? (
                    <svg 
                      className={sizes.iconInner} 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path 
                        fillRule="evenodd" 
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                        clipRule="evenodd" 
                      />
                    </svg>
                  ) : (
                    <StepIcon className={sizes.iconInner} />
                  )}
                </div>
                
                {/* Step Info */}
                <div className="text-center mt-2 max-w-20 sm:max-w-24">
                  <p className={`${sizes.title} font-medium transition-colors duration-200 ${
                    isActive 
                      ? 'text-blue-600 dark:text-blue-400' 
                      : isCompleted
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-gray-600 dark:text-gray-400'
                  }`}>
                    {step.title}
                  </p>
                  
                  {step.description && (
                    <p className={`${sizes.description} text-gray-500 dark:text-gray-500 mt-1 leading-tight`}>
                      {step.description}
                    </p>
                  )}
                </div>
              </div>
              
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="flex-1 mx-4 sm:mx-6">
                  <div className={`${sizes.connector} w-full rounded-full transition-colors duration-300 ${
                    currentStep > step.id 
                      ? 'bg-green-500' 
                      : 'bg-gray-200 dark:bg-gray-700'
                  }`} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StepProgress;
