import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import { PanelTopInactive } from 'lucide-react';

const UserStoryBuilder = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [userStoryData, setUserStoryData] = useState({
        persona: '',
        action: '',
        benefit: '',
        priority: '',
        acceptanceCriteria: [],
        definitionOfDone: [],
        notes: ''
    });
    const { t } = useLanguage();

    // Set default priority after translations are loaded
    React.useEffect(() => {
        if (userStoryData.priority === '') {
            setUserStoryData(prev => ({ ...prev, priority: t('userStory.builder.priorities.medium') }));
        }
    }, [t, userStoryData.priority]);

    const steps = [
        {
            id: 1,
            title: t('userStory.builder.steps.step1.title'),
            icon: HiDocumentText,
            description: t('userStory.builder.steps.step1.description')
        },
        {
            id: 2,
            title: t('userStory.builder.steps.step2.title'),
            icon: HiCheckCircle,
            description: t('userStory.builder.steps.step2.description')
        },
        {
            id: 3,
            title: t('userStory.builder.steps.step3.title'),
            icon: HiClipboard,
            description: t('userStory.builder.steps.step3.description')
        },
        {
            id: 4,
            title: t('userStory.builder.steps.step4.title'),
            icon: HiEye,
            description: t('userStory.builder.steps.step4.description')
        }
    ];

    const priorities = [
        {
            value: t('userStory.builder.priorities.high'),
            active: 'bg-red-500/30 border-border-red-200 dark:border-red-600 text-red-600 dark:text-red-400 hover:border-red/600 hover:bg-red-700',
        },
        {
            value: t('userStory.builder.priorities.medium'),
            active: 'bg-yellow-500/30 border-border-yellow-200 dark:border-yellow-600 text-yellow-600 dark:text-yellow-400 hover:border-yellow/600 hover:bg-yellow-700',
        },
        {
            value: t('userStory.builder.priorities.low'),
            active: 'bg-green-500/30 border-border-green-200 dark:border-green-600 text-green-600 dark:text-green-400 hover:border-green/600 hover:bg-green-700',
        }
    ];

    const quickTemplates = React.useMemo(() => {
        const currentLanguage = t('language.portuguese') === 'Português' ? 'pt' : 'en';

        if (currentLanguage === 'pt') {
            return [
                'Como usuário final, eu quero fazer login no sistema',
                'Como administrador, eu quero gerenciar usuários',
                'Como cliente, eu quero visualizar meu histórico de pedidos',
                'Como desenvolvedor, eu quero acessar logs do sistema'
            ];
        } else {
            return [
                'As an end user, I want to login to the system',
                'As an administrator, I want to manage users',
                'As a customer, I want to view my order history',
                'As a developer, I want to access system logs'
            ];
        }
    }, [t]);

    const updateUserStoryData = (field, value) => {
        setUserStoryData(prev => ({ ...prev, [field]: value }));
    };

    const generatePreview = () => {
        const { persona, action, benefit } = userStoryData;
        if (!persona || !action) return t('userStory.builder.form.previewEmpty');

        const benefitText = benefit ? ` para ${benefit}` : '';
        return t('userStory.builder.form.previewTemplate', {
            persona,
            action,
            benefit: benefitText
        });
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
                return
            case 2:
                return <Step2Content data={userStoryData} updateData={updateUserStoryData} t={t} />;
            case 3:
                return <Step3Content data={userStoryData} updateData={updateUserStoryData} t={t} />;
            case 4:
                return <Step4Content data={userStoryData} generatePreview={generatePreview} t={t} />;
            default:
                return null;
        }
    };

    return (
        <div className="w-7xl mx-auto">
            {/* Main Content Card */}
            <Step1Content
                data={userStoryData}
                updateData={updateUserStoryData}
                priorities={priorities}
                quickTemplates={quickTemplates}
                generatePreview={generatePreview}
                t={t}
            />
            <Step2Content data={userStoryData} updateData={updateUserStoryData} t={t}>
                
            </Step2Content>
        </div>
    );
};

// Step 1: Estrutura Base
const Step1Content = ({ data, updateData, priorities, quickTemplates, generatePreview, t }) => {
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
        <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-4">
                {/* Form Section - Takes 2 columns */}
                <div className="xl:col-span-7">
                    <Card className="bg-white dark:bg-gray-800/50 border-gray-200/50 dark:border-gray-700/50 shadow-sm">
                        <CardHeader>
                            <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                                <div className="w-1.5 h-6 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full mr-2"></div>
                                {t('userStory.builder.steps.step1.title')}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-5">
                            {/* Persona Field */}
                            <div className="group space-y-2">
                                <Label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
                                    <div className="flex items-center justify-center w-6 h-6 bg-blue-100 dark:bg-blue-900/30 rounded-lg mr-2">
                                        <HiUser className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    {t('userStory.builder.form.persona')} <span className="text-red-500 ml-1">*</span>
                                    <span className="text-xs text-gray-500 dark:text-gray-400 ml-2 font-normal">{t('userStory.builder.form.personaHelp')}</span>
                                </Label>
                                <Input
                                    type="text"
                                    value={data.persona}
                                    onChange={(e) => updateData('persona', e.target.value)}
                                    placeholder={t('userStory.builder.form.personaPlaceholder')}
                                    className="w-full bg-gray-50/50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 text-sm transition-all duration-200 group-hover:bg-gray-50 dark:group-hover:bg-gray-700/70"
                                />
                            </div>

                            {/* Ação Field */}
                            <div className="group space-y-2">
                                <Label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
                                    <div className="flex items-center justify-center w-6 h-6 bg-blue-100 dark:bg-blue-900/30 rounded-lg mr-2">
                                        <HiLightBulb className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    {t('userStory.builder.form.action')} <span className="text-red-500 ml-1">*</span>
                                    <span className="text-xs text-gray-500 dark:text-gray-400 ml-2 font-normal">{t('userStory.builder.form.actionHelp')}</span>
                                </Label>
                                <Input
                                    type="text"
                                    value={data.action}
                                    onChange={(e) => updateData('action', e.target.value)}
                                    placeholder={t('userStory.builder.form.actionPlaceholder')}
                                    className="w-full bg-gray-50/50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 text-sm transition-all duration-200 group-hover:bg-gray-50 dark:group-hover:bg-gray-700/70"
                                />
                            </div>

                            {/* Benefício Field */}
                            <div className="group space-y-2">
                                <Label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
                                    <div className="flex items-center justify-center w-6 h-6 bg-blue-100 dark:bg-blue-900/30 rounded-lg mr-2">
                                        <HiStar className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    {t('userStory.builder.form.benefit')}
                                    <span className="text-xs text-gray-500 dark:text-gray-400 ml-2 font-normal">{t('userStory.builder.form.benefitHelp')}</span>
                                </Label>
                                <Input
                                    type="text"
                                    value={data.benefit}
                                    onChange={(e) => updateData('benefit', e.target.value)}
                                    placeholder={t('userStory.builder.form.benefitPlaceholder')}
                                    className="w-full bg-gray-50/50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 text-sm transition-all duration-200 group-hover:bg-gray-50 dark:group-hover:bg-gray-700/70"
                                />
                            </div>

                            {/* Prioridade */}
                            <div>
                                <Label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                                    <div className="flex items-center justify-center w-6 h-6 bg-blue-100 dark:bg-blue-900/30 rounded-lg mr-2">
                                        <HiStar className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    {t('userStory.builder.form.priority')}
                                </Label>
                                <div className="grid grid-cols-3 gap-3">
                                    {priorities.map((priority) => (
                                        console.log(priority),
                                        <Button
                                            key={priority.value}
                                            onClick={() => updateData('priority', priority.value)}
                                            className={`relative p-3 rounded-lg border-2 transition-all duration-200 group
                                                ${data.priority === priority.value
                                                    ? ` ${priority.active}`
                                                    : ` 'bg-white/10 dark:bg-white/10 border-border-gray-100 dark:border-white/20 text-gray-600 dark:text-white'`
                                                }`}
                                        >
                                            <div className="text-center">
                                                <div className="font-medium text-xs">{priority.value}</div>
                                            </div>
                                            {data.priority === priority.value && (
                                                <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-blue-100 rounded-full"></div>
                                            )}
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar - Templates and Preview */}
                <div className="xl:col-span-5 space-y-4">
                    {/* Preview Card */}
                    <Card className="bg-gradient-to-br from-emerald-50 via-blue-50 to-indigo-50 dark:from-gray-800/80 dark:via-gray-800/60 dark:to-gray-800/80 border-emerald-200/50 dark:border-gray-700/50 shadow-sm sticky top-6">
                        <CardHeader className="pb-3">
                            <CardTitle className="flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                <div className="flex items-center justify-center w-8 h-8 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg mr-2">
                                    <HiEye className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                                </div>
                                {t('userStory.builder.form.preview')}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg p-3 border border-white/20 dark:border-gray-700/20 min-h-[60px] flex items-center shadow-sm">
                                <p className="text-gray-900 dark:text-white font-medium leading-relaxed text-sm">
                                    {generatePreview()}
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Templates Card */}
                    <Card className="bg-white dark:bg-gray-800/50 border-gray-200/50 dark:border-gray-700/50 shadow-sm">
                        <CardHeader className="pb-3">
                            <CardTitle className="flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                <div className="flex items-center justify-center w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-lg mr-2">
                                    <HiGlobeAlt className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                                </div>
                                {t('userStory.builder.form.templates')}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="space-y-2">
                                {quickTemplates.map((template, index) => (
                                    <button
                                        key={index}
                                        onClick={() => applyTemplate(template)}
                                        className="w-full text-left p-3 bg-gray-50/80 dark:bg-gray-700/50 rounded-lg border border-gray-200/50 dark:border-gray-600/50 hover:bg-blue-50/80 dark:hover:bg-gray-700/80 hover:border-blue-200 dark:hover:border-blue-500/30 transition-all duration-200 text-xs leading-relaxed group"
                                    >
                                        <span className="text-gray-700 dark:text-gray-300 group-hover:text-blue-700 dark:group-hover:text-blue-300">
                                            {template}
                                        </span>
                                    </button>
                                ))}
                            </div>
                            <div className="mt-3 p-2 bg-blue-50/50 dark:bg-blue-900/20 rounded-lg border border-blue-200/50 dark:border-blue-700/30">
                                <p className="text-xs text-blue-700 dark:text-blue-300 font-medium">
                                    {t('userStory.builder.form.templatesHelp')}
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

// Placeholder components for other steps
const Step2Content = ({ data, updateData, t }) => (
    <div className="text-center py-12">
        <HiCheckCircle className="w-16 h-16 text-blue-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {t('userStory.builder.placeholders.step2.title')}
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
            {t('userStory.builder.placeholders.step2.description')}
        </p>
    </div>
);

const Step3Content = ({ data, updateData, t }) => (
    <div className="text-center py-12">
        <HiClipboard className="w-16 h-16 text-blue-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {t('userStory.builder.placeholders.step3.title')}
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
            {t('userStory.builder.placeholders.step3.description')}
        </p>
    </div>
);

const Step4Content = ({ data, generatePreview, t }) => (
    <div className="text-center py-12">
        <HiEye className="w-16 h-16 text-blue-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {t('userStory.builder.placeholders.step4.title')}
        </h2>
        <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg max-w-2xl mx-auto">
            <p className="text-lg text-gray-900 dark:text-white font-medium">
                {generatePreview()}
            </p>
        </div>
    </div>
);

export default UserStoryBuilder;
