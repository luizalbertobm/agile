import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MarkdownPreviewer } from '@/components/ui/MarkdownPreviewer';
import { 
    FileText, 
    CheckCircle, 
    CheckCircle2, 
    StickyNote, 
    BookOpen, 
    Code, 
    BarChart3,
    Plus,
    Minus,
    Trash
} from 'lucide-react';

function UserStoryBuilder() {
    const { t } = useTranslation();
    
    // State for user story data
    const [userStoryData, setUserStoryData] = React.useState({
        title: '',
        as: '',
        iWant: '',
        soThat: '',
        description: '',
        priority: '',
        storyPoints: '',
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

    // Priorities data
    const priorities = [
        { value: 'baixa', label: t('userStory.priorities.low') },
        { value: 'media', label: t('userStory.priorities.medium') },
        { value: 'alta', label: t('userStory.priorities.high') },
        { value: 'critica', label: t('userStory.priorities.critical') }
    ];

    // Story Points data (Fibonacci sequence)
    const storyPoints = [
        { value: '1', label: '1' },
        { value: '2', label: '2' },
        { value: '3', label: '3' },
        { value: '5', label: '5' },
        { value: '8', label: '8' },
        { value: '13', label: '13' },
        { value: '21', label: '21' },
        { value: '34', label: '34' },
        { value: '55', label: '55' },
        { value: '89', label: '89' }
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
        // Simple template parsing - can be enhanced
        const templateData = template.template || template;
        updateUserStoryData({ 
            title: template.name || t('userStory.templates.defaultTitle'),
            description: templateData
        });
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
            markdown += `# ${userStoryData.title}\n\n`;
        }
        
        if (userStoryData.as || userStoryData.iWant || userStoryData.soThat) {
            markdown += `## ${t('userStory.structure.title')}\n\n`;
            if (userStoryData.as || userStoryData.iWant || userStoryData.soThat) {
                markdown += `**${t('userStory.form.as')}** ${userStoryData.as || '_[pendente]_'}  \n`;
                markdown += `**${t('userStory.form.iWant')}** ${userStoryData.iWant || '_[pendente]_'}  \n`;
                markdown += `**${t('userStory.form.soThat')}** ${userStoryData.soThat || '_[pendente]_'}\n\n`;
            }
        }
        
        if (userStoryData.description) {
            markdown += `## ${t('userStory.form.description')}\n\n${userStoryData.description}\n\n`;
        }
        
        if (userStoryData.priority || userStoryData.storyPoints) {
            markdown += `## Detalhes\n\n`;
            if (userStoryData.priority) {
                const priorityLabel = priorities.find(p => p.value === userStoryData.priority)?.label || userStoryData.priority;
                markdown += `- **${t('userStory.form.priority')}:** ${priorityLabel}\n`;
            }
            if (userStoryData.storyPoints) {
                markdown += `- **${t('userStory.form.storyPoints')}:** ${userStoryData.storyPoints}\n`;
            }
            markdown += '\n';
        }
        
        if (userStoryData.acceptanceCriteria.length > 0) {
            markdown += `## ${t('userStory.acceptanceCriteria.title')}\n\n`;
            userStoryData.acceptanceCriteria.forEach((scenario, index) => {
                markdown += `### ${t('userStory.acceptanceCriteria.scenario')} ${index + 1}\n\n`;
                if (scenario.given) markdown += `**Given** ${scenario.given}  \n`;
                if (scenario.when) markdown += `**When** ${scenario.when}  \n`;
                if (scenario.then) markdown += `**Then** ${scenario.then}  \n`;
                if (scenario.and && scenario.and.length > 0) {
                    scenario.and.forEach(condition => {
                        if (condition) markdown += `**And** ${condition}  \n`;
                    });
                }
                markdown += '\n';
            });
        }
        
        if (userStoryData.definitionOfDone.length > 0) {
            markdown += `## ${t('userStory.definitionOfDone.title')}\n\n`;
            userStoryData.definitionOfDone.forEach((item) => {
                const checkbox = item.completed ? '- [x]' : '- [ ]';
                markdown += `${checkbox} ${item.text}\n`;
            });
            markdown += '\n';
        }
        
        if (userStoryData.notes) {
            markdown += `## ${t('userStory.notes.title')}\n\n${userStoryData.notes}\n\n`;
        }
        
        return markdown || `*${t('userStory.preview.empty')}*`;
    };

    return (
        <div className="max-w-7xl mx-auto p-6 space-y-6">
            {/* Header */}
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {t('userStory.builder.title')}
                </h1>
                <p className="text-gray-600 dark:text-gray-300">
                    {t('userStory.builder.subtitle')}
                </p>
            </div>

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
                    />

                    {/* Templates Card */}
                    <TemplatesCard 
                        quickTemplates={quickTemplates}
                        applyTemplate={applyTemplate}
                        t={t}
                    />

                    {/* Gherkin Templates */}
                    <GherkinTemplatesCard 
                        gherkinTemplates={gherkinTemplates}
                        applyGherkinTemplate={applyGherkinTemplate}
                        setNewScenario={setNewScenario}
                        t={t}
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
function UserStoryBasicInfo({ data, updateData, priorities, storyPoints, t }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    {t('userStory.basicInfo.title')}
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {/* Title */}
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

                {/* User Story Fields */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

                {/* Description */}
                <div>
                    <Label className="block text-sm font-medium mb-2">
                        {t('userStory.form.description')}
                    </Label>
                    <Textarea
                        placeholder={t('userStory.form.descriptionPlaceholder')}
                        value={data.description}
                        onChange={(e) => updateData({ description: e.target.value })}
                        rows={3}
                    />
                </div>

                {/* Priority and Business Value */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
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
                    <div>
                        <Label className="block text-sm font-medium mb-2">
                            {t('userStory.form.storyPoints')}
                        </Label>
                        <Select
                            value={data.storyPoints}
                            onValueChange={(value) => updateData({ storyPoints: value })}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder={t('userStory.form.selectStoryPoints')} />
                            </SelectTrigger>
                            <SelectContent>
                                {storyPoints.map((point) => (
                                    <SelectItem key={point.value} value={point.value}>
                                        {point.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
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
    t 
}) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5" />
                    {t('userStory.acceptanceCriteria.title')}
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
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
                                <Textarea
                                    placeholder={t('userStory.acceptanceCriteria.givenPlaceholder')}
                                    value={scenario.given}
                                    onChange={(e) => updateScenario(index, { given: e.target.value })}
                                    rows={2}
                                />
                            </div>

                            {/* When */}
                            <div>
                                <Label className="block text-sm font-medium mb-1 text-blue-700 dark:text-blue-400">
                                    When
                                </Label>
                                <Textarea
                                    placeholder={t('userStory.acceptanceCriteria.whenPlaceholder')}
                                    value={scenario.when}
                                    onChange={(e) => updateScenario(index, { when: e.target.value })}
                                    rows={2}
                                />
                            </div>

                            {/* Then */}
                            <div>
                                <Label className="block text-sm font-medium mb-1 text-purple-700 dark:text-purple-400">
                                    Then
                                </Label>
                                <Textarea
                                    placeholder={t('userStory.acceptanceCriteria.thenPlaceholder')}
                                    value={scenario.then}
                                    onChange={(e) => updateScenario(index, { then: e.target.value })}
                                    rows={2}
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
                                            <Textarea
                                                placeholder={t('userStory.acceptanceCriteria.andPlaceholder')}
                                                value={andCondition}
                                                onChange={(e) => updateAndCondition(index, andIndex, e.target.value)}
                                                rows={1}
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
                            <Textarea
                                placeholder={t('userStory.acceptanceCriteria.givenPlaceholder')}
                                value={newScenario.given}
                                onChange={(e) => setNewScenario({ ...newScenario, given: e.target.value })}
                                rows={2}
                            />
                        </div>
                        <div>
                            <Label className="block text-sm font-medium mb-1 text-blue-700 dark:text-blue-400">
                                When
                            </Label>
                            <Textarea
                                placeholder={t('userStory.acceptanceCriteria.whenPlaceholder')}
                                value={newScenario.when}
                                onChange={(e) => setNewScenario({ ...newScenario, when: e.target.value })}
                                rows={2}
                            />
                        </div>
                        <div>
                            <Label className="block text-sm font-medium mb-1 text-purple-700 dark:text-purple-400">
                                Then
                            </Label>
                            <Textarea
                                placeholder={t('userStory.acceptanceCriteria.thenPlaceholder')}
                                value={newScenario.then}
                                onChange={(e) => setNewScenario({ ...newScenario, then: e.target.value })}
                                rows={2}
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
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5" />
                    {t('userStory.definitionOfDone.title')}
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {/* Existing Items */}
                {data.definitionOfDone.map((item, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 border rounded-lg bg-gray-50 dark:bg-gray-800">
                        <input
                            type="checkbox"
                            checked={item.completed}
                            onChange={(e) => updateDefinitionItem(index, { completed: e.target.checked })}
                            className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                        />
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

// Templates Card Component
function TemplatesCard({ quickTemplates, applyTemplate, t }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    {t('userStory.templates.title')}
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
                {quickTemplates.map((template, index) => (
                    <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => applyTemplate(template)}
                        className="w-full justify-start text-left"
                    >
                        {template.name}
                    </Button>
                ))}
            </CardContent>
        </Card>
    );
}

// Gherkin Templates Card Component
function GherkinTemplatesCard({ gherkinTemplates, applyGherkinTemplate, setNewScenario, t }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Code className="h-5 w-5" />
                    {t('userStory.gherkin.title')}
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
                {gherkinTemplates.map((template, index) => (
                    <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => {
                            setNewScenario(template);
                            applyGherkinTemplate(template);
                        }}
                        className="w-full justify-start text-left"
                    >
                        {template.name}
                    </Button>
                ))}
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
            </CardContent>
        </Card>
    );
}

export default UserStoryBuilder;
