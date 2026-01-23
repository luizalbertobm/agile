import React, { useMemo, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Switch
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useTranslation } from 'react-i18next';
import { useLanguage } from './hooks/useLanguage';

const initialStoryData = {
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
};

const initialScenario = {
  given: '',
  when: '',
  then: '',
  and: []
};

function App() {
  const { t } = useTranslation();
  const { availableLanguages, changeLanguage, currentLanguage } = useLanguage();
  const [userStoryData, setUserStoryData] = useState(initialStoryData);
  const [newScenario, setNewScenario] = useState(initialScenario);
  const [newDefinitionItem, setNewDefinitionItem] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('none');

  const priorities = useMemo(() => ([
    { value: 'baixa', label: t('userStory.priorities.low') },
    { value: 'media', label: t('userStory.priorities.medium') },
    { value: 'alta', label: t('userStory.priorities.high') },
    { value: 'critica', label: t('userStory.priorities.critical') }
  ]), [t]);

  const storyPoints = useMemo(() => ([
    { value: '1', label: '1 SP' },
    { value: '2', label: '2 SP' },
    { value: '3', label: '3 SP' },
    { value: '5', label: '5 SP' },
    { value: '8', label: '8 SP' },
    { value: '13', label: '13 SP' },
    { value: '21', label: '21 SP' }
  ]), []);

  const quickTemplates = useMemo(() => ([
    { name: t('userStory.templates.login'), template: t('userStory.templates.loginTemplate') },
    { name: t('userStory.templates.ecommerce'), template: t('userStory.templates.ecommerceTemplate') },
    { name: t('userStory.templates.dashboard'), template: t('userStory.templates.dashboardTemplate') },
    { name: t('userStory.templates.profile'), template: t('userStory.templates.profileTemplate') }
  ]), [t]);

  const gherkinTemplates = useMemo(() => ([
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
  ]), [t]);

  const updateUserStoryData = (updates) => {
    setUserStoryData(prev => ({ ...prev, ...updates }));
  };

  const addScenario = () => {
    if (newScenario.given && newScenario.when && newScenario.then) {
      setUserStoryData(prev => ({
        ...prev,
        acceptanceCriteria: [...prev.acceptanceCriteria, { ...newScenario }]
      }));
      setNewScenario(initialScenario);
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
            and: scenario.and.map((condition, j) => (j === andIndex ? value : condition))
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
          ? { ...scenario, and: scenario.and.filter((_, j) => j !== andIndex) }
          : scenario
      )
    }));
  };

  const addDefinitionItem = () => {
    if (newDefinitionItem.trim()) {
      setUserStoryData(prev => ({
        ...prev,
        definitionOfDone: [
          ...prev.definitionOfDone,
          { text: newDefinitionItem.trim(), completed: false }
        ]
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
    const templateText = template.template || template;
    setSelectedTemplate(template.name || '');

    const ptPattern = /Como\s+(.+?),\s*eu\s+quero\s+(.+?)\s+para\s+que\s+(.+?)$/i;
    const enPattern = /As\s+a?\s*(.+?),\s*I\s+want\s+(?:to\s+)?(.+?)\s+so\s+that\s+(.+?)$/i;

    const match = templateText.match(ptPattern) || templateText.match(enPattern);

    if (match) {
      updateUserStoryData({
        title: template.name || t('userStory.templates.defaultTitle'),
        as: match[1].trim(),
        iWant: match[2].trim(),
        soThat: match[3].trim()
      });
    } else {
      updateUserStoryData({
        title: template.name || t('userStory.templates.defaultTitle'),
        as: t('userStory.templates.defaultAs') || 'usuário',
        iWant: templateText,
        soThat: t('userStory.templates.defaultSoThat') || 'alcançar meus objetivos'
      });
    }
  };

  const handleTemplateChange = (templateName) => {
    setSelectedTemplate(templateName);
    if (templateName && templateName !== 'none') {
      const template = quickTemplates.find(templateItem => templateItem.name === templateName);
      if (template) {
        applyTemplate(template);
      }
    } else {
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
      markdown += `**${t('userStory.form.as')}** ${userStoryData.as || '_[pendente]_'}  \n`;
      markdown += `**${t('userStory.form.iWant')}** ${userStoryData.iWant || '_[pendente]_'}  \n`;
      markdown += `**${t('userStory.form.soThat')}** ${userStoryData.soThat || '_[pendente]_'}\n\n`;
    }

    if (userStoryData.priority || userStoryData.storyPoints) {
      markdown += `### ${t('userStory.details.title')}\n\n`;
      if (userStoryData.priority) {
        const priorityLabel = priorities.find(priority => priority.value === userStoryData.priority)?.label || userStoryData.priority;
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

  const summary = useMemo(() => {
    const scenariosCount = userStoryData.acceptanceCriteria.length;
    const definitionItemsCount = userStoryData.definitionOfDone.length;
    const completedItemsCount = userStoryData.definitionOfDone.filter(item => item.completed).length;

    return {
      scenariosCount,
      definitionItemsCount,
      completedItemsCount
    };
  }, [userStoryData]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.navbar}>
        <Text style={styles.navbarTitle}>{t('navbar.brand')}</Text>
        <View style={styles.languageRow}>
          {availableLanguages.map(language => (
            <TouchableOpacity
              key={language.code}
              onPress={() => changeLanguage(language.code)}
              style={[
                styles.languageButton,
                currentLanguage === language.code && styles.languageButtonActive
              ]}
            >
              <Text style={styles.languageButtonText}>{language.flag} {language.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <SectionCard title={t('userStory.basicInfo.title')}>
          <LabeledInput
            label={t('userStory.form.title')}
            placeholder={t('userStory.form.titlePlaceholder')}
            value={userStoryData.title}
            onChangeText={(value) => updateUserStoryData({ title: value })}
          />
          <LabeledInput
            label={t('userStory.form.as')}
            placeholder={t('userStory.form.asPlaceholder')}
            value={userStoryData.as}
            onChangeText={(value) => updateUserStoryData({ as: value })}
          />
          <LabeledInput
            label={t('userStory.form.iWant')}
            placeholder={t('userStory.form.iWantPlaceholder')}
            value={userStoryData.iWant}
            onChangeText={(value) => updateUserStoryData({ iWant: value })}
          />
          <LabeledInput
            label={t('userStory.form.soThat')}
            placeholder={t('userStory.form.soThatPlaceholder')}
            value={userStoryData.soThat}
            onChangeText={(value) => updateUserStoryData({ soThat: value })}
          />

          <Text style={styles.sectionSubTitle}>{t('userStory.form.templates')}</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
            <TemplateChip
              label={t('userStory.form.templateNone')}
              isActive={selectedTemplate === 'none'}
              onPress={() => handleTemplateChange('none')}
            />
            {quickTemplates.map(template => (
              <TemplateChip
                key={template.name}
                label={template.name}
                isActive={selectedTemplate === template.name}
                onPress={() => handleTemplateChange(template.name)}
              />
            ))}
          </ScrollView>

          <Text style={styles.sectionSubTitle}>{t('userStory.details.title')}</Text>
          <Text style={styles.inputLabel}>{t('userStory.form.priority')}</Text>
          <Picker
            selectedValue={userStoryData.priority}
            onValueChange={(value) => updateUserStoryData({ priority: value })}
            style={styles.picker}
          >
            <Picker.Item label={t('common.select')} value="" />
            {priorities.map(priority => (
              <Picker.Item key={priority.value} label={priority.label} value={priority.value} />
            ))}
          </Picker>

          <Text style={styles.inputLabel}>{t('userStory.form.storyPoints')}</Text>
          <Picker
            selectedValue={userStoryData.storyPoints}
            onValueChange={(value) => updateUserStoryData({ storyPoints: value })}
            style={styles.picker}
          >
            <Picker.Item label={t('common.select')} value="" />
            {storyPoints.map(points => (
              <Picker.Item key={points.value} label={points.label} value={points.value} />
            ))}
          </Picker>

          <LabeledInput
            label={t('userStory.form.tags')}
            placeholder={t('userStory.form.tagsPlaceholder')}
            value={userStoryData.tags}
            onChangeText={(value) => updateUserStoryData({ tags: value })}
          />
        </SectionCard>

        <SectionCard title={t('userStory.acceptanceCriteria.title')}>
          <Text style={styles.sectionSubTitle}>{t('userStory.form.templates')}</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
            {gherkinTemplates.map(template => (
              <TemplateChip
                key={template.name}
                label={template.name}
                onPress={() => applyGherkinTemplate(template)}
              />
            ))}
          </ScrollView>

          <LabeledInput
            label="Given"
            placeholder={t('userStory.acceptanceCriteria.givenPlaceholder')}
            value={newScenario.given}
            onChangeText={(value) => setNewScenario(prev => ({ ...prev, given: value }))}
          />
          <LabeledInput
            label="When"
            placeholder={t('userStory.acceptanceCriteria.whenPlaceholder')}
            value={newScenario.when}
            onChangeText={(value) => setNewScenario(prev => ({ ...prev, when: value }))}
          />
          <LabeledInput
            label="Then"
            placeholder={t('userStory.acceptanceCriteria.thenPlaceholder')}
            value={newScenario.then}
            onChangeText={(value) => setNewScenario(prev => ({ ...prev, then: value }))}
          />

          <PrimaryButton
            label={t('userStory.acceptanceCriteria.addScenario')}
            onPress={addScenario}
            disabled={!(newScenario.given && newScenario.when && newScenario.then)}
          />

          {userStoryData.acceptanceCriteria.map((scenario, index) => (
            <View key={`${scenario.given}-${index}`} style={styles.listCard}>
              <View style={styles.listCardHeader}>
                <Text style={styles.listCardTitle}>{t('userStory.acceptanceCriteria.scenario')} {index + 1}</Text>
                <TouchableOpacity onPress={() => removeScenario(index)}>
                  <Text style={styles.deleteText}>{t('common.delete')}</Text>
                </TouchableOpacity>
              </View>
              <LabeledInput
                label="Given"
                placeholder={t('userStory.acceptanceCriteria.givenPlaceholder')}
                value={scenario.given}
                onChangeText={(value) => updateScenario(index, { given: value })}
              />
              <LabeledInput
                label="When"
                placeholder={t('userStory.acceptanceCriteria.whenPlaceholder')}
                value={scenario.when}
                onChangeText={(value) => updateScenario(index, { when: value })}
              />
              <LabeledInput
                label="Then"
                placeholder={t('userStory.acceptanceCriteria.thenPlaceholder')}
                value={scenario.then}
                onChangeText={(value) => updateScenario(index, { then: value })}
              />

              <Text style={styles.inputLabel}>And</Text>
              {scenario.and?.map((condition, andIndex) => (
                <View key={`${andIndex}`} style={styles.inlineRow}>
                  <TextInput
                    value={condition}
                    onChangeText={(value) => updateAndCondition(index, andIndex, value)}
                    placeholder={t('userStory.acceptanceCriteria.andPlaceholder')}
                    style={[styles.input, styles.inlineInput]}
                  />
                  <TouchableOpacity onPress={() => removeAndCondition(index, andIndex)}>
                    <Text style={styles.deleteText}>-</Text>
                  </TouchableOpacity>
                </View>
              ))}

              <SecondaryButton
                label={t('userStory.acceptanceCriteria.addAnd')}
                onPress={() => addAndCondition(index)}
              />
            </View>
          ))}
        </SectionCard>

        <SectionCard title={t('userStory.definitionOfDone.title')}>
          {userStoryData.definitionOfDone.map((item, index) => (
            <View key={`${item.text}-${index}`} style={styles.definitionRow}>
              <Switch
                value={item.completed}
                onValueChange={(value) => updateDefinitionItem(index, { completed: value })}
              />
              <TextInput
                value={item.text}
                onChangeText={(value) => updateDefinitionItem(index, { text: value })}
                placeholder={t('userStory.definitionOfDone.itemPlaceholder')}
                style={[styles.input, styles.definitionInput]}
              />
              <TouchableOpacity onPress={() => removeDefinitionItem(index)}>
                <Text style={styles.deleteText}>{t('common.delete')}</Text>
              </TouchableOpacity>
            </View>
          ))}

          <View style={styles.inlineRow}>
            <TextInput
              value={newDefinitionItem}
              onChangeText={setNewDefinitionItem}
              placeholder={t('userStory.definitionOfDone.addPlaceholder')}
              style={[styles.input, styles.inlineInput]}
            />
            <PrimaryButton
              label={t('common.add')}
              onPress={addDefinitionItem}
              disabled={!newDefinitionItem.trim()}
              compact
            />
          </View>
        </SectionCard>

        <SectionCard title={t('userStory.notes.title')}>
          <TextInput
            value={userStoryData.notes}
            onChangeText={(value) => updateUserStoryData({ notes: value })}
            placeholder={t('userStory.notes.placeholder')}
            style={[styles.input, styles.textArea]}
            multiline
          />
        </SectionCard>

        <SectionCard title={t('userStory.preview.title')}>
          <Text style={styles.previewText}>{generatePreview()}</Text>
        </SectionCard>

        <SectionCard title={t('userStory.summary.title')}>
          <SummaryRow label={t('userStory.summary.scenarios')} value={summary.scenariosCount} />
          <SummaryRow label={t('userStory.summary.definitionItems')} value={summary.definitionItemsCount} />
          <SummaryRow
            label={t('userStory.summary.progress')}
            value={summary.definitionItemsCount > 0
              ? `${Math.round((summary.completedItemsCount / summary.definitionItemsCount) * 100)}%`
              : '0%'}
          />
          {userStoryData.priority ? (
            <SummaryRow label={t('userStory.form.priority')} value={userStoryData.priority} />
          ) : null}
          {userStoryData.storyPoints ? (
            <SummaryRow label={t('userStory.form.storyPoints')} value={userStoryData.storyPoints} />
          ) : null}
          {userStoryData.tags ? (
            <SummaryRow label={t('userStory.form.tags')} value={userStoryData.tags} />
          ) : null}
        </SectionCard>
      </ScrollView>
    </SafeAreaView>
  );
}

function SectionCard({ title, children }) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{title}</Text>
      {children}
    </View>
  );
}

function LabeledInput({ label, placeholder, value, onChangeText }) {
  return (
    <View style={styles.inputGroup}>
      <Text style={styles.inputLabel}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        style={styles.input}
      />
    </View>
  );
}

function TemplateChip({ label, onPress, isActive }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.chip, isActive && styles.chipActive]}
    >
      <Text style={[styles.chipText, isActive && styles.chipTextActive]}>{label}</Text>
    </TouchableOpacity>
  );
}

function PrimaryButton({ label, onPress, disabled, compact }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.primaryButton,
        compact && styles.primaryButtonCompact,
        disabled && styles.buttonDisabled
      ]}
    >
      <Text style={styles.primaryButtonText}>{label}</Text>
    </TouchableOpacity>
  );
}

function SecondaryButton({ label, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.secondaryButton}>
      <Text style={styles.secondaryButtonText}>{label}</Text>
    </TouchableOpacity>
  );
}

function SummaryRow({ label, value }) {
  return (
    <View style={styles.summaryRow}>
      <Text style={styles.summaryLabel}>{label}</Text>
      <Text style={styles.summaryValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFC'
  },
  navbar: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#0F172A'
  },
  navbarTitle: {
    color: '#F8FAFC',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8
  },
  languageRow: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  languageButton: {
    backgroundColor: '#1E293B',
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 8,
    marginBottom: 8
  },
  languageButtonActive: {
    backgroundColor: '#38BDF8'
  },
  languageButtonText: {
    color: '#F8FAFC',
    fontSize: 12
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#0F172A',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 12
  },
  sectionSubTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 8,
    marginTop: 8
  },
  inputGroup: {
    marginBottom: 12
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#475569',
    marginBottom: 6
  },
  input: {
    borderWidth: 1,
    borderColor: '#CBD5F5',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    backgroundColor: '#F8FAFC'
  },
  textArea: {
    minHeight: 120,
    textAlignVertical: 'top'
  },
  picker: {
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    marginBottom: 12
  },
  horizontalScroll: {
    marginBottom: 8
  },
  chip: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#CBD5F5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    backgroundColor: '#FFFFFF'
  },
  chipActive: {
    backgroundColor: '#0EA5E9',
    borderColor: '#0EA5E9'
  },
  chipText: {
    color: '#0F172A',
    fontSize: 12
  },
  chipTextActive: {
    color: '#FFFFFF'
  },
  primaryButton: {
    backgroundColor: '#2563EB',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8
  },
  primaryButtonCompact: {
    paddingVertical: 8,
    paddingHorizontal: 12
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontWeight: '600'
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: '#CBD5F5',
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8
  },
  secondaryButtonText: {
    color: '#0F172A',
    fontWeight: '600'
  },
  buttonDisabled: {
    backgroundColor: '#94A3B8'
  },
  listCard: {
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 10,
    padding: 12,
    marginTop: 12,
    backgroundColor: '#F8FAFC'
  },
  listCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8
  },
  listCardTitle: {
    fontSize: 14,
    fontWeight: '600'
  },
  deleteText: {
    color: '#DC2626',
    fontWeight: '600'
  },
  inlineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8
  },
  inlineInput: {
    flex: 1,
    marginRight: 8
  },
  definitionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  },
  definitionInput: {
    flex: 1,
    marginHorizontal: 8
  },
  previewText: {
    fontSize: 12,
    color: '#334155',
    lineHeight: 18
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6
  },
  summaryLabel: {
    color: '#475569',
    fontSize: 13
  },
  summaryValue: {
    color: '#0F172A',
    fontWeight: '600'
  }
});

export default App;
