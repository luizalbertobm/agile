import React, { useState } from 'react';
import { Button } from 'flowbite-react';
import { 
  HiDocumentText, 
  HiCheckCircle, 
  HiEye,
  HiChevronRight,
  HiChevronLeft,
  HiStar,
  HiUser,
  HiLightBulb,
  HiGlobeAlt
} from 'react-icons/hi2';
import { HiClipboard } from 'react-icons/hi';
import { useLanguage } from '../../hooks/useLanguage';
import StepProgress from '../common/StepProgress/StepProgress';

const UserStoryBuilder = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [userStoryData, setUserStoryData] = useState({
    persona: '',
    action: '',
    benefit: '',
    priority: 'Média',
    acceptanceCriteria: [],
    definitionOfDone: [],
    notes: ''
  });
  const { t } = useLanguage();

  const steps = [
    {
      id: 1,
      title: 'Estrutura Base',
      icon: HiDocumentText,
      description: 'Defina a estrutura básica da User Story'
    },
    {
      id: 2,
      title: 'Critérios de Aceitação',
      icon: HiCheckCircle,
      description: 'Estabeleça critérios claros de aceitação'
    },
    {
      id: 3,
      title: 'Definição de Pronto',
      icon: HiClipboard,
      description: 'Configure a definição de pronto'
    },
    {
      id: 4,
      title: 'Revisão Final',
      icon: HiEye,
      description: 'Revise e finalize sua User Story'
    }
  ];

  const priorities = [
    { value: 'Alta', color: 'text-red-600 bg-red-50 border-red-200', icon: '🔴' },
    { value: 'Média', color: 'text-yellow-600 bg-yellow-50 border-yellow-200', icon: '🟡' },
    { value: 'Baixa', color: 'text-green-600 bg-green-50 border-green-200', icon: '🟢' }
  ];

  const quickTemplates = [
    'Como usuário final, eu quero fazer login no sistema',
    'Como administrador, eu quero gerenciar usuários',
    'Como cliente, eu quero visualizar meu histórico de pedidos',
    'Como desenvolvedor, eu quero acessar logs do sistema'
  ];

  const updateUserStoryData = (field, value) => {
    setUserStoryData(prev => ({ ...prev, [field]: value }));
  };

  const generatePreview = () => {
    const { persona, action, benefit } = userStoryData;
    if (!persona || !action) return 'Complete os campos para ver o preview';
    
    let preview = `Como ${persona}, eu quero ${action}`;
    if (benefit) preview += ` para ${benefit}`;
    return preview;
  };

  const nextStep = () => {
    if (currentStep < steps.length) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const goToStep = (stepId) => {
    setCurrentStep(stepId);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <Step1Content 
          data={userStoryData} 
          updateData={updateUserStoryData}
          priorities={priorities}
          quickTemplates={quickTemplates}
          generatePreview={generatePreview}
        />;
      case 2:
        return <Step2Content data={userStoryData} updateData={updateUserStoryData} />;
      case 3:
        return <Step3Content data={userStoryData} updateData={updateUserStoryData} />;
      case 4:
        return <Step4Content data={userStoryData} generatePreview={generatePreview} />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          User Story Builder
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Crie User Stories bem estruturadas de forma fácil e profissional
        </p>
      </div>

      {/* Progress Steps */}
      <div className="mb-8">
        <StepProgress
          steps={steps}
          currentStep={currentStep}
          onStepClick={goToStep}
          size="normal"
          className="mb-4"
        />
      </div>

      {/* Main Content Card */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="p-8">
          {renderStepContent()}
        </div>

        {/* Navigation Footer */}
        />
      </div>

      {/* Main Content Card */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="p-8">
          {renderStepContent()}
        </div>

        {/* Navigation Footer */}
        <div className="px-8 py-4 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600">
          <div className="flex justify-between items-center">
            <Button
              color="gray"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="cursor-pointer"
            >
              <HiChevronLeft className="w-4 h-4 mr-2" />
              Anterior
            </Button>

            <div className="text-sm text-gray-500 dark:text-gray-400">
              Passo {currentStep} de {steps.length}
            </div>

            <Button
              color="blue"
              onClick={nextStep}
              disabled={currentStep === steps.length}
              className="cursor-pointer"
            >
              {currentStep === steps.length ? 'Finalizar' : 'Próximo'}
              <HiChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Step 1: Estrutura Base
const Step1Content = ({ data, updateData, priorities, quickTemplates, generatePreview }) => {
  const applyTemplate = (template) => {
    // Simple parsing of template - this could be more sophisticated
    const parts = template.split(',');
    if (parts.length >= 2) {
      const persona = parts[0].replace('Como ', '').trim();
      const action = parts[1].replace(' eu quero ', '').trim();
      updateData('persona', persona);
      updateData('action', action);
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Estrutura da User Story
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Modelo: <span className="font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
            Como [persona], eu quero [ação] para [benefício]
          </span>
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Form */}
        <div className="space-y-6">
          {/* Persona */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <HiUser className="w-4 h-4 mr-2 text-blue-600" />
              Persona (Quem?)
            </label>
            <input
              type="text"
              value={data.persona}
              onChange={(e) => updateData('persona', e.target.value)}
              placeholder="ex: usuário final, administrador, cliente..."
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-200"
            />
          </div>

          {/* Ação */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <HiLightBulb className="w-4 h-4 mr-2 text-green-600" />
              Ação (O quê?)
            </label>
            <input
              type="text"
              value={data.action}
              onChange={(e) => updateData('action', e.target.value)}
              placeholder="ex: fazer login no sistema, gerenciar usuários..."
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-200"
            />
          </div>

          {/* Benefício */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <HiStar className="w-4 h-4 mr-2 text-yellow-600" />
              Benefício (Por quê?)
            </label>
            <input
              type="text"
              value={data.benefit}
              onChange={(e) => updateData('benefit', e.target.value)}
              placeholder="ex: acessar funcionalidades personalizadas..."
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-200"
            />
          </div>

          {/* Prioridade */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              <HiStar className="w-4 h-4 mr-2 text-orange-600" />
              Prioridade
            </label>
            <div className="grid grid-cols-3 gap-3">
              {priorities.map((priority) => (
                <button
                  key={priority.value}
                  onClick={() => updateData('priority', priority.value)}
                  className={`p-3 rounded-lg border-2 transition-all duration-200 hover:scale-105 ${
                    data.priority === priority.value
                      ? `${priority.color} border-current`
                      : 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-600'
                  }`}
                >
                  <div className="text-center">
                    <div className="text-2xl mb-1">{priority.icon}</div>
                    <div className="text-sm font-medium">{priority.value}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Templates and Preview */}
        <div className="space-y-6">
          {/* Templates Rápidos */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-600 p-6 rounded-xl border border-blue-200 dark:border-gray-600">
            <h3 className="flex items-center text-lg font-semibold text-gray-900 dark:text-white mb-4">
              <HiGlobeAlt className="w-5 h-5 mr-2 text-blue-600" />
              Templates Rápidos
            </h3>
            <div className="space-y-2">
              {quickTemplates.map((template, index) => (
                <button
                  key={index}
                  onClick={() => applyTemplate(template)}
                  className="w-full text-left p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-blue-50 dark:hover:bg-gray-700 transition-all duration-200 text-sm"
                >
                  {template}
                </button>
              ))}
            </div>
          </div>

          {/* Preview */}
          <div className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-700 dark:to-gray-600 p-6 rounded-xl border border-green-200 dark:border-gray-600">
            <h3 className="flex items-center text-lg font-semibold text-gray-900 dark:text-white mb-4">
              <HiEye className="w-5 h-5 mr-2 text-green-600" />
              Preview da User Story
            </h3>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-600 min-h-[60px] flex items-center">
              <p className="text-gray-900 dark:text-white font-medium italic">
                {generatePreview()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Placeholder components for other steps
const Step2Content = ({ data, updateData }) => (
  <div className="text-center py-12">
    <HiCheckCircle className="w-16 h-16 text-blue-600 mx-auto mb-4" />
    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
      Critérios de Aceitação
    </h2>
    <p className="text-gray-600 dark:text-gray-300">
      Em desenvolvimento - Defina critérios claros e mensuráveis
    </p>
  </div>
);

const Step3Content = ({ data, updateData }) => (
  <div className="text-center py-12">
    <HiClipboard className="w-16 h-16 text-blue-600 mx-auto mb-4" />
    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
      Definição de Pronto
    </h2>
    <p className="text-gray-600 dark:text-gray-300">
      Em desenvolvimento - Configure a definição de pronto
    </p>
  </div>
);

const Step4Content = ({ data, generatePreview }) => (
  <div className="text-center py-12">
    <HiEye className="w-16 h-16 text-blue-600 mx-auto mb-4" />
    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
      Revisão Final
    </h2>
    <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg max-w-2xl mx-auto">
      <p className="text-lg text-gray-900 dark:text-white font-medium">
        {generatePreview()}
      </p>
    </div>
  </div>
);

export default UserStoryBuilder;
