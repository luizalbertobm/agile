import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { MarkdownPreviewer } from '@/components/ui/MarkdownPreviewer';
import {
    FileText,
    CheckCircle,
    CheckCircle2,
    StickyNote,
    Code,
    BarChart3,
    Plus,
    Minus,
    Trash,
    ChevronDown,
    Info
} from 'lucide-react';

function UserStoryBuilder() {
    const { t } = useTranslation();

    // State for user story data
    const [userStoryData, setUserStoryData] = React.useState({
        title: '',
        as: '',
        iWant: '',
        soThat: '',
        priority: '',
        storyPoints: '',
        tags: '',
        acceptanceCriteria: [],
        definitionOfDone: [],
        notes: ''
    });

    // State for new scenario
    const [newScenario, setNewScenario] = React.useState({
        given: '',
        when: '',
        then: '',
        and: []
    });

    // State for new definition item
    const [newDefinitionItem, setNewDefinitionItem] = React.useState('');

    // State for selected template
    const [selectedTemplate, setSelectedTemplate] = React.useState('none');

    // Priorities data
    const priorities = [
        { value: 'baixa', label: t('userStory.priorities.low') },
        { value: 'media', label: t('userStory.priorities.medium') },
        { value: 'alta', label: t('userStory.priorities.high') },
        { value: 'critica', label: t('userStory.priorities.critical') }
    ];

    // Story Points data (Fibonacci sequence)
    const storyPoints = [
        { value: '1', label: '1 SP' },
        { value: '2', label: '2 SP' },
        { value: '3', label: '3 SP' },
        { value: '5', label: '5 SP' },
        { value: '8', label: '8 SP' },
        { value: '13', label: '13 SP' },
        { value: '21', label: '21 SP' }
    ];

    // Quick templates
    const quickTemplates = [
        {
            name: t('userStory.templates.login'),
            template: t('userStory.templates.loginTemplate')
        },
        {
            name: t('userStory.templates.ecommerce'),
            template: t('userStory.templates.ecommerceTemplate')
        },
        {
            name: t('userStory.templates.dashboard'),
            template: t('userStory.templates.dashboardTemplate')
        },
        {
            name: t('userStory.templates.profile'),
            template: t('userStory.templates.profileTemplate')
        }
    ];

    // Gherkin templates
    const gherkinTemplates = [
        {
            name: t('userStory.gherkin.login'),
            given: t('userStory.gherkin.loginGiven'),
            when: t('userStory.gherkin.loginWhen'),
            then: t('userStory.gherkin.loginThen')
        },
        {
            name: t('userStory.gherkin.form'),
            given: t('userStory.gherkin.formGiven'),
            when: t('userStory.gherkin.formWhen'),
            then: t('userStory.gherkin.formThen')
        },
        {
            name: t('userStory.gherkin.navigation'),
            given: t('userStory.gherkin.navigationGiven'),
            when: t('userStory.gherkin.navigationWhen'),
            then: t('userStory.gherkin.navigationThen')
        }
    ];

    // Helper functions
    const updateUserStoryData = (updates) => {
        setUserStoryData(prev => ({ ...prev, ...updates }));
    };

    const addScenario = () => {
        if (newScenario.given && newScenario.when && newScenario.then) {
            setUserStoryData(prev => ({
                ...prev,
                acceptanceCriteria: [...prev.acceptanceCriteria, { ...newScenario }]
            }));
            setNewScenario({ given: '', when: '', then: '', and: [] });
        }
    };

    const removeScenario = (index) => {
        setUserStoryData(prev => ({
            ...prev,
            acceptanceCriteria: prev.acceptanceCriteria.filter((_, i) => i !== index)
        }));
    };

    const updateScenario = (index, updates) => {
        setUserStoryData(prev => ({
            ...prev,
            acceptanceCriteria: prev.acceptanceCriteria.map((scenario, i) =>
                i === index ? { ...scenario, ...updates } : scenario
            )
        }));
    };

    const addAndCondition = (scenarioIndex) => {
        setUserStoryData(prev => ({
            ...prev,
            acceptanceCriteria: prev.acceptanceCriteria.map((scenario, i) =>
                i === scenarioIndex
                    ? { ...scenario, and: [...(scenario.and || []), ''] }
                    : scenario
            )
        }));
    };

    const updateAndCondition = (scenarioIndex, andIndex, value) => {
        setUserStoryData(prev => ({
            ...prev,
            acceptanceCriteria: prev.acceptanceCriteria.map((scenario, i) =>
                i === scenarioIndex
                    ? {
                        ...scenario,
                        and: scenario.and.map((condition, j) => j === andIndex ? value : condition)
                    }
                    : scenario
            )
        }));
    };

    const removeAndCondition = (scenarioIndex, andIndex) => {
        setUserStoryData(prev => ({
            ...prev,
            acceptanceCriteria: prev.acceptanceCriteria.map((scenario, i) =>
                i === scenarioIndex
                    ? {
                        ...scenario,
                        and: scenario.and.filter((_, j) => j !== andIndex)
                    }
                    : scenario
            )
        }));
    };

    const addDefinitionItem = () => {
        if (newDefinitionItem.trim()) {
            setUserStoryData(prev => ({
                ...prev,
                definitionOfDone: [...prev.definitionOfDone, { text: newDefinitionItem.trim(), completed: false }]
            }));
            setNewDefinitionItem('');
        }
    };

    const removeDefinitionItem = (index) => {
        setUserStoryData(prev => ({
            ...prev,
            definitionOfDone: prev.definitionOfDone.filter((_, i) => i !== index)
        }));
    };

    const updateDefinitionItem = (index, updates) => {
        setUserStoryData(prev => ({
            ...prev,
            definitionOfDone: prev.definitionOfDone.map((item, i) =>
                i === index ? { ...item, ...updates } : item
            )
        }));
    };

    const applyTemplate = (template) => {
        // Parse do template para extrair os campos estruturais
        const templateText = template.template || template;

        // Update selected template state
        setSelectedTemplate(template.name || '');

        // Regex para extrair padrões em português e inglês
        const ptPattern = /Como\s+(.+?),\s*eu\s+quero\s+(.+?)\s+para\s+que\s+(.+?)$/i;
        const enPattern = /As\s+a?\s*(.+?),\s*I\s+want\s+(?:to\s+)?(.+?)\s+so\s+that\s+(.+?)$/i;

        let match = templateText.match(ptPattern) || templateText.match(enPattern);

        if (match) {
            updateUserStoryData({
                title: template.name || t('userStory.templates.defaultTitle'),
                as: match[1].trim(),
                iWant: match[2].trim(),
                soThat: match[3].trim()
            });
        } else {
            // Fallback para templates que não seguem o padrão
            updateUserStoryData({
                title: template.name || t('userStory.templates.defaultTitle'),
                as: 'usuário',
                iWant: templateText,
                soThat: 'alcançar meus objetivos'
            });
        }
    };

    const handleTemplateChange = (templateName) => {
        setSelectedTemplate(templateName);
        if (templateName && templateName !== 'none') {
            const template = quickTemplates.find(t => t.name === templateName);
            if (template) {
                applyTemplate(template);
            }
        } else {
            // Clear fields when "No template" is selected
            updateUserStoryData({
                title: '',
                as: '',
                iWant: '',
                soThat: '',
                tags: ''
            });
        }
    };

    const applyGherkinTemplate = (template) => {
        // Apply template to new scenario
        setNewScenario({
            given: template.given,
            when: template.when,
            then: template.then,
            and: []
        });
    };

    const generatePreview = () => {
        let markdown = '';

        if (userStoryData.title) {
            markdown += `## ${userStoryData.title}\n\n`;
        }

        if (userStoryData.as || userStoryData.iWant || userStoryData.soThat) {
            if (userStoryData.as || userStoryData.iWant || userStoryData.soThat) {
                markdown += `**${t('userStory.form.as')}** ${userStoryData.as || '_[pendente]_'}  \n`;
                markdown += `**${t('userStory.form.iWant')}** ${userStoryData.iWant || '_[pendente]_'}  \n`;
                markdown += `**${t('userStory.form.soThat')}** ${userStoryData.soThat || '_[pendente]_'}\n\n`;
            }
        }

        if (userStoryData.priority || userStoryData.storyPoints) {
            markdown += `### ${t('userStory.details.title')}\n\n`;
            if (userStoryData.priority) {
                const priorityLabel = priorities.find(p => p.value === userStoryData.priority)?.label || userStoryData.priority;
                markdown += `- **${t('userStory.form.priority')}:** ${priorityLabel}\n`;
            }
            if (userStoryData.storyPoints) {
                markdown += `- **${t('userStory.form.storyPoints')}:** ${userStoryData.storyPoints}\n`;
            }
            if (userStoryData.tags && userStoryData.tags.trim()) {
                const tagsList = userStoryData.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
                if (tagsList.length > 0) {
                    markdown += `- **${t('userStory.form.tags')}:** ${tagsList.map(tag => `\`${tag}\``).join(' ')}\n`;
                }
            }
            markdown += '\n';
        }

        if (userStoryData.acceptanceCriteria.length > 0) {
            markdown += `### ${t('userStory.acceptanceCriteria.title')}\n\n`;
            userStoryData.acceptanceCriteria.forEach((scenario, index) => {
                markdown += '```gherkin\n';
                markdown += `Scenario: ${t('userStory.acceptanceCriteria.scenario')} ${index + 1}\n`;
                if (scenario.given) markdown += `Given ${scenario.given}\n`;
                if (scenario.when) markdown += `When ${scenario.when}\n`;
                if (scenario.then) markdown += `Then ${scenario.then}\n`;
                if (scenario.and && scenario.and.length > 0) {
                    scenario.and.forEach(condition => {
                        if (condition) markdown += `And ${condition}\n`;
                    });
                }
                markdown += '```\n\n';
            });
        }

        if (userStoryData.definitionOfDone.length > 0) {
            markdown += `### ${t('userStory.definitionOfDone.title')}\n\n`;
            userStoryData.definitionOfDone.forEach((item) => {
                const checkbox = item.completed ? '- [x]' : '- [ ]';
                markdown += `${checkbox} ${item.text}\n`;
            });
            markdown += '\n';
        }

        if (userStoryData.notes) {
            markdown += `### ${t('userStory.notes.title')}\n\n${userStoryData.notes}\n\n`;
        }

        return markdown || `*${t('userStory.preview.empty')}*`;
    };

    return (
        <div className="max-w-7xl mx-auto p-6 space-y-6">

            {/* Main Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left Column - Main Content */}
                <div className="lg:col-span-7 space-y-6">
                    {/* User Story Basic Information */}
                    <UserStoryBasicInfo
                        data={userStoryData}
                        updateData={updateUserStoryData}
                        priorities={priorities}
                        storyPoints={storyPoints}
                        quickTemplates={quickTemplates}
                        selectedTemplate={selectedTemplate}
                        handleTemplateChange={handleTemplateChange}
                        t={t}
                    />

                    {/* Acceptance Criteria */}
                    <AcceptanceCriteriaSection
                        data={userStoryData}
                        updateData={updateUserStoryData}
                        newScenario={newScenario}
                        setNewScenario={setNewScenario}
                        addScenario={addScenario}
                        removeScenario={removeScenario}
                        updateScenario={updateScenario}
                        addAndCondition={addAndCondition}
                        updateAndCondition={updateAndCondition}
                        removeAndCondition={removeAndCondition}
                        gherkinTemplates={gherkinTemplates}
                        applyGherkinTemplate={applyGherkinTemplate}
                        t={t}
                    />

                    {/* Definition of Done */}
                    <DefinitionOfDoneSection
                        data={userStoryData}
                        updateData={updateUserStoryData}
                        newDefinitionItem={newDefinitionItem}
                        setNewDefinitionItem={setNewDefinitionItem}
                        addDefinitionItem={addDefinitionItem}
                        removeDefinitionItem={removeDefinitionItem}
                        updateDefinitionItem={updateDefinitionItem}
                        t={t}
                    />

                    {/* Notes */}
                    <NotesSection
                        data={userStoryData}
                        updateData={updateUserStoryData}
                        t={t}
                    />
                </div>

                {/* Right Column - Sidebar */}
                <div className="lg:col-span-5 space-y-6">
                    {/* Preview Card */}
                    <MarkdownPreviewer
                        markdown={generatePreview()}
                        title={t('userStory.preview.title')}
                        progressData={userStoryData}
                    />

                    {/* Summary Card */}
                    <SummaryCard
                        data={userStoryData}
                        t={t}
                    />
                </div>
            </div>
        </div>
    );
}

// User Story Basic Information Component
function UserStoryBasicInfo({ data, updateData, priorities, storyPoints, quickTemplates, selectedTemplate, handleTemplateChange, t }) {
    const [showTemplateDropdown, setShowTemplateDropdown] = React.useState(false);
    const dropdownRef = React.useRef(null);

    // Close dropdown when clicking outside
    React.useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowTemplateDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleTemplateSelect = (template) => {
        handleTemplateChange(template.name);
        setShowTemplateDropdown(false);
    };

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    {t('userStory.basicInfo.title')}
                </CardTitle>
                <div className="flex items-center gap-2">
                    <div className="relative" ref={dropdownRef}>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setShowTemplateDropdown(!showTemplateDropdown)}
                            className="text-xs flex items-center gap-1"
                        >
                            <FileText className="h-4 w-4" />
                            {selectedTemplate === 'none' || !selectedTemplate ? t('userStory.form.templates') : selectedTemplate}
                            <ChevronDown className={`h-3 w-3 transition-transform ${showTemplateDropdown ? 'rotate-180' : ''}`} />
                        </Button>
                        {showTemplateDropdown && (
                            <div className="absolute right-0 top-full mt-1 w-56 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-10">
                                <div className="py-1">
                                    <button
                                        onClick={() => {
                                            handleTemplateChange('none');
                                            setShowTemplateDropdown(false);
                                        }}
                                        className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                                    >
                                        {t('userStory.form.templateNone')}
                                    </button>
                                    {quickTemplates.map((template, index) => (
                                        <button
                                            key={index}
                                            onClick={() => handleTemplateSelect(template)}
                                            className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                                        >
                                            {template.name}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                {/* Title */}

                {/* User Story Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <Label className="block text-sm font-medium mb-2">
                            {t('userStory.form.title')}
                        </Label>
                        <Input
                            placeholder={t('userStory.form.titlePlaceholder')}
                            value={data.title}
                            onChange={(e) => updateData({ title: e.target.value })}
                        />
                    </div>
                    <div>
                        <Label className="block text-sm font-medium mb-2">
                            {t('userStory.form.as')}
                        </Label>
                        <Input
                            placeholder={t('userStory.form.asPlaceholder')}
                            value={data.as}
                            onChange={(e) => updateData({ as: e.target.value })}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                    <div>
                        <Label className="block text-sm font-medium mb-2">
                            {t('userStory.form.iWant')}
                        </Label>
                        <Input
                            placeholder={t('userStory.form.iWantPlaceholder')}
                            value={data.iWant}
                            onChange={(e) => updateData({ iWant: e.target.value })}
                        />
                    </div>
                    <div>
                        <Label className="block text-sm font-medium mb-2">
                            {t('userStory.form.soThat')}
                        </Label>
                        <Input
                            placeholder={t('userStory.form.soThatPlaceholder')}
                            value={data.soThat}
                            onChange={(e) => updateData({ soThat: e.target.value })}
                        />
                    </div>
                </div>

                {/* Priority and Business Value */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div className='md:col-span-1'>
                        <Label className="block text-sm font-medium mb-2">
                            {t('userStory.form.priority')}
                        </Label>
                        <Select
                            value={data.priority}
                            onValueChange={(value) => updateData({ priority: value })}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder={t('userStory.form.selectPriority')} />
                            </SelectTrigger>
                            <SelectContent>
                                {priorities.map((priority) => (
                                    <SelectItem key={priority.value} value={priority.value}>
                                        {priority.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    
                    <div className='md:col-span-1'>
                        <Label className="block text-sm font-medium mb-2">
                            {t('userStory.form.tags')}
                        </Label>
                        <Input
                            placeholder={t('userStory.form.tagsPlaceholder')}
                            value={data.tags}
                            onChange={(e) => updateData({ tags: e.target.value })}
                        />
                    </div>
                    
                </div>
                <div className='md:col-span-4'>
                        <Label className="block text-sm font-medium mb-2">
                            {t('userStory.form.storyPoints')}
                        </Label>
                        <div className="space-y-4">
                            <Slider
                                value={data.storyPoints ? [storyPoints.findIndex(sp => sp.value === data.storyPoints)] : [0]}
                                onValueChange={(value) => {
                                    const selectedIndex = value[0];
                                    updateData({ storyPoints: storyPoints[selectedIndex]?.value || '' });
                                }}
                                max={storyPoints.length - 1}
                                min={0}
                                step={1}
                                className="w-full"
                            />
                            {/* Tick marks for story points */}
                            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 px-2">
                                {storyPoints.map((point, index) => (
                                    <span 
                                        key={point.value}
                                        className={`transition-colors ${
                                            data.storyPoints === point.value 
                                                ? 'text-blue-600 dark:text-blue-400 font-medium' 
                                                : 'text-gray-400 dark:text-gray-600'
                                        }`}
                                    >
                                        {point.value}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
            </CardContent>
        </Card>
    );
}

// Acceptance Criteria Section Component
function AcceptanceCriteriaSection({
    data,
    updateData,
    newScenario,
    setNewScenario,
    addScenario,
    removeScenario,
    updateScenario,
    addAndCondition,
    updateAndCondition,
    removeAndCondition,
    gherkinTemplates,
    applyGherkinTemplate,
    t
}) {
    const [showGherkinDropdown, setShowGherkinDropdown] = React.useState(false);
    const [selectedGherkinTemplate, setSelectedGherkinTemplate] = React.useState('');
    const gherkinDropdownRef = React.useRef(null);

    // Close dropdown when clicking outside
    React.useEffect(() => {
        const handleClickOutside = (event) => {
            if (gherkinDropdownRef.current && !gherkinDropdownRef.current.contains(event.target)) {
                setShowGherkinDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleGherkinTemplateSelect = (template) => {
        setSelectedGherkinTemplate(template.name);
        setNewScenario(template);
        applyGherkinTemplate(template);
        setShowGherkinDropdown(false);
    };

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5" />
                    {t('userStory.acceptanceCriteria.title')}
                </CardTitle>
                <div className="flex items-center gap-2">
                    <div className="relative" ref={gherkinDropdownRef}>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setShowGherkinDropdown(!showGherkinDropdown)}
                            className="text-xs flex items-center gap-1"
                        >
                            <FileText className="h-4 w-4" />
                            {selectedGherkinTemplate || t('userStory.form.templates')}
                            <ChevronDown className={`h-3 w-3 transition-transform ${showGherkinDropdown ? 'rotate-180' : ''}`} />
                        </Button>
                        {showGherkinDropdown && (
                            <div className="absolute right-0 top-full mt-1 w-56 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-10">
                                <div className="py-1">
                                    <button
                                        onClick={() => {
                                            setSelectedGherkinTemplate('');
                                            setShowGherkinDropdown(false);
                                        }}
                                        className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                                    >
                                        {t('userStory.form.templateNone')}
                                    </button>
                                    {gherkinTemplates.map((template, index) => (
                                        <button
                                            key={index}
                                            onClick={() => handleGherkinTemplateSelect(template)}
                                            className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                                        >
                                            {template.name}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                {/* Add New Scenario */}
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4">
                    <h4 className="font-medium mb-3 text-gray-900 dark:text-white">
                        {t('userStory.acceptanceCriteria.addNew')}
                    </h4>
                    <div className="space-y-3">
                        <div>
                            <Label className="block text-sm font-medium mb-1 text-green-700 dark:text-green-400">
                                Given
                            </Label>
                            <Input
                                placeholder={t('userStory.acceptanceCriteria.givenPlaceholder')}
                                value={newScenario.given}
                                onChange={(e) => setNewScenario({ ...newScenario, given: e.target.value })}
                            />
                        </div>
                        <div>
                            <Label className="block text-sm font-medium mb-1 text-blue-700 dark:text-blue-400">
                                When
                            </Label>
                            <Input
                                placeholder={t('userStory.acceptanceCriteria.whenPlaceholder')}
                                value={newScenario.when}
                                onChange={(e) => setNewScenario({ ...newScenario, when: e.target.value })}
                            />
                        </div>
                        <div>
                            <Label className="block text-sm font-medium mb-1 text-purple-700 dark:text-purple-400">
                                Then
                            </Label>
                            <Input
                                placeholder={t('userStory.acceptanceCriteria.thenPlaceholder')}
                                value={newScenario.then}
                                onChange={(e) => setNewScenario({ ...newScenario, then: e.target.value })}
                            />
                        </div>
                        <Button
                            onClick={addScenario}
                            disabled={!newScenario.given || !newScenario.when || !newScenario.then}
                            className="w-full"
                        >
                            <Plus className="h-4 w-4 mr-2" />
                            {t('userStory.acceptanceCriteria.addScenario')}
                        </Button>
                    </div>
                </div>
                {/* Existing Scenarios */}
                {data.acceptanceCriteria.map((scenario, index) => (
                    <div key={index} className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-800">
                        <div className="flex justify-between items-start mb-3">
                            <h4 className="font-medium text-gray-900 dark:text-white">
                                {t('userStory.acceptanceCriteria.scenario')} {index + 1}
                            </h4>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => removeScenario(index)}
                                className="text-red-600 hover:text-red-700"
                            >
                                <Trash className="h-4 w-4" />
                            </Button>
                        </div>

                        <div className="space-y-3">
                            {/* Given */}
                            <div>
                                <Label className="block text-sm font-medium mb-1 text-green-700 dark:text-green-400">
                                    Given
                                </Label>
                                <Input
                                    placeholder={t('userStory.acceptanceCriteria.givenPlaceholder')}
                                    value={scenario.given}
                                    onChange={(e) => updateScenario(index, { given: e.target.value })}
                                />
                            </div>

                            {/* When */}
                            <div>
                                <Label className="block text-sm font-medium mb-1 text-blue-700 dark:text-blue-400">
                                    When
                                </Label>
                                <Input
                                    placeholder={t('userStory.acceptanceCriteria.whenPlaceholder')}
                                    value={scenario.when}
                                    onChange={(e) => updateScenario(index, { when: e.target.value })}
                                />
                            </div>

                            {/* Then */}
                            <div>
                                <Label className="block text-sm font-medium mb-1 text-purple-700 dark:text-purple-400">
                                    Then
                                </Label>
                                <Input
                                    placeholder={t('userStory.acceptanceCriteria.thenPlaceholder')}
                                    value={scenario.then}
                                    onChange={(e) => updateScenario(index, { then: e.target.value })}
                                />
                            </div>

                            {/* And Conditions */}
                            {scenario.and && scenario.and.length > 0 && (
                                <div>
                                    <Label className="block text-sm font-medium mb-1 text-orange-700 dark:text-orange-400">
                                        And
                                    </Label>
                                    {scenario.and.map((andCondition, andIndex) => (
                                        <div key={andIndex} className="flex gap-2 mb-2">
                                            <Input
                                                placeholder={t('userStory.acceptanceCriteria.andPlaceholder')}
                                                value={andCondition}
                                                onChange={(e) => updateAndCondition(index, andIndex, e.target.value)}
                                                className="flex-1"
                                            />
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => removeAndCondition(index, andIndex)}
                                                className="text-red-600 hover:text-red-700"
                                            >
                                                <Minus className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => addAndCondition(index)}
                                className="w-full"
                            >
                                <Plus className="h-4 w-4 mr-2" />
                                {t('userStory.acceptanceCriteria.addAnd')}
                            </Button>
                        </div>
                    </div>
                ))}

                
            </CardContent>
        </Card>
    );
}

// Definition of Done Section Component
function DefinitionOfDoneSection({
    data,
    updateData,
    newDefinitionItem,
    setNewDefinitionItem,
    addDefinitionItem,
    removeDefinitionItem,
    updateDefinitionItem,
    t
}) {
    const [showInvestGuidelines, setShowInvestGuidelines] = React.useState(false);

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5" />
                    {t('userStory.definitionOfDone.title')}
                </CardTitle>
            </CardHeader>
            
            {/* INVEST Guidelines Collapsible */}
            <div className="mx-6 mb-2">
                <Collapsible open={showInvestGuidelines} onOpenChange={setShowInvestGuidelines}>
                    <CollapsibleTrigger asChild>
                        <Button
                            variant="outline"
                            size="sm"
                            className="w-full justify-between text-xs h-auto p-3 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700 hover:bg-blue-100 dark:hover:bg-blue-900/30 text-blue-900 dark:text-blue-100"
                        >
                            <div className="flex items-center gap-2">
                                <Info className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                <span className="font-medium">
                                    {t('userStory.definitionOfDone.investTitle')}
                                </span>
                            </div>
                            <ChevronDown className={`h-3 w-3 text-blue-600 dark:text-blue-400 transition-transform ${showInvestGuidelines ? 'rotate-180' : ''}`} />
                        </Button>
                    </CollapsibleTrigger>
                    
                    <CollapsibleContent className="data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up overflow-hidden">
                        <div className="mt-1 p-2 ">
                            <p className="text-sm text-blue-800 dark:text-blue-200 leading-relaxed mb-4">
                                {t('userStory.definitionOfDone.investDescription')}
                            </p>
                            
                            {/* INVEST Detailed Breakdown */}
                            <div className="space-y-3">
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                                        I
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-blue-900 dark:text-blue-100 text-sm">
                                            {t('userStory.definitionOfDone.independent.title')}
                                        </h4>
                                        <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">
                                            {t('userStory.definitionOfDone.independent.description')}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                                        N
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-blue-900 dark:text-blue-100 text-sm">
                                            {t('userStory.definitionOfDone.negotiable.title')}
                                        </h4>
                                        <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">
                                            {t('userStory.definitionOfDone.negotiable.description')}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                                        V
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-blue-900 dark:text-blue-100 text-sm">
                                            {t('userStory.definitionOfDone.valuable.title')}
                                        </h4>
                                        <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">
                                            {t('userStory.definitionOfDone.valuable.description')}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                                        E
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-blue-900 dark:text-blue-100 text-sm">
                                            {t('userStory.definitionOfDone.estimable.title')}
                                        </h4>
                                        <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">
                                            {t('userStory.definitionOfDone.estimable.description')}
                                        </p>
                                    </div>
                                </div>
                                
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                                        S
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-blue-900 dark:text-blue-100 text-sm">
                                            {t('userStory.definitionOfDone.small.title')}
                                        </h4>
                                        <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">
                                            {t('userStory.definitionOfDone.small.description')}
                                        </p>
                                    </div>
                                </div>
                                
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                                        T
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-blue-900 dark:text-blue-100 text-sm">
                                            {t('userStory.definitionOfDone.testable.title')}
                                        </h4>
                                        <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">
                                            {t('userStory.definitionOfDone.testable.description')}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CollapsibleContent>
                </Collapsible>
            </div>

            <CardContent className="space-y-4">
                {/* Existing Items */}
                {data.definitionOfDone.map((item, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 border rounded-lg bg-gray-50 dark:bg-gray-800">
                        <Input
                            value={item.text}
                            onChange={(e) => updateDefinitionItem(index, { text: e.target.value })}
                            className="flex-1"
                            placeholder={t('userStory.definitionOfDone.itemPlaceholder')}
                        />
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => removeDefinitionItem(index)}
                            className="text-red-600 hover:text-red-700"
                        >
                            <Trash className="h-4 w-4" />
                        </Button>
                    </div>
                ))}

                {/* Add New Item */}
                <div className="flex gap-2">
                    <Input
                        placeholder={t('userStory.definitionOfDone.addPlaceholder')}
                        value={newDefinitionItem}
                        onChange={(e) => setNewDefinitionItem(e.target.value)}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter' && newDefinitionItem.trim()) {
                                addDefinitionItem();
                            }
                        }}
                        className="flex-1"
                    />
                    <Button
                        onClick={addDefinitionItem}
                        disabled={!newDefinitionItem.trim()}
                    >
                        <Plus className="h-4 w-4" />
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}

// Notes Section Component
function NotesSection({ data, updateData, t }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <StickyNote className="h-5 w-5" />
                    {t('userStory.notes.title')}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Textarea
                    placeholder={t('userStory.notes.placeholder')}
                    value={data.notes}
                    onChange={(e) => updateData({ notes: e.target.value })}
                    rows={4}
                />
            </CardContent>
        </Card>
    );
}

// Summary Card Component
function SummaryCard({ data, t }) {
    const scenariosCount = data.acceptanceCriteria.length;
    const definitionItemsCount = data.definitionOfDone.length;
    const completedItemsCount = data.definitionOfDone.filter(item => item.completed).length;

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    {t('userStory.summary.title')}
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                        {t('userStory.summary.scenarios')}
                    </span>
                    <Badge variant="secondary">
                        {scenariosCount}
                    </Badge>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                        {t('userStory.summary.definitionItems')}
                    </span>
                    <Badge variant="secondary">
                        {definitionItemsCount}
                    </Badge>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                        {t('userStory.summary.progress')}
                    </span>
                    <Badge variant={completedItemsCount === definitionItemsCount && definitionItemsCount > 0 ? "default" : "secondary"}>
                        {definitionItemsCount > 0 ? `${Math.round((completedItemsCount / definitionItemsCount) * 100)}%` : '0%'}
                    </Badge>
                </div>
                {data.priority && (
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                            {t('userStory.form.priority')}
                        </span>
                        <Badge variant="outline">
                            {data.priority}
                        </Badge>
                    </div>
                )}
                {data.storyPoints && (
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                            {t('userStory.form.storyPoints')}
                        </span>
                        <Badge variant="outline">
                            {data.storyPoints}
                        </Badge>
                    </div>
                )}
                {data.tags && data.tags.trim() && (
                    <div className="space-y-2">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                            {t('userStory.form.tags')}
                        </span>
                        <div className="flex flex-wrap gap-1">
                            {data.tags.split(',').map(tag => tag.trim()).filter(tag => tag).map((tag, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                    {tag}
                                </Badge>
                            ))}
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}

export default UserStoryBuilder;
