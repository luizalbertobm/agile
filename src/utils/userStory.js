export const createEmptyUserStoryData = () => ({
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

export const buildUserStoryMarkdown = ({ data, t, priorityLabelMap = {} }) => {
  let markdown = '';

  if (data.title) {
    markdown += `## ${data.title}\n\n`;
  }

  if (data.as || data.iWant || data.soThat) {
    markdown += `**${t('userStory.form.as')}** ${data.as || '_[pendente]_'}  \n`;
    markdown += `**${t('userStory.form.iWant')}** ${data.iWant || '_[pendente]_'}  \n`;
    markdown += `**${t('userStory.form.soThat')}** ${data.soThat || '_[pendente]_'}\n\n`;
  }

  if (data.priority || data.storyPoints) {
    markdown += `### ${t('userStory.details.title')}\n\n`;
    if (data.priority) {
      const priorityLabel = priorityLabelMap[data.priority] || data.priority;
      markdown += `- **${t('userStory.form.priority')}:** ${priorityLabel}\n`;
    }
    if (data.storyPoints) {
      markdown += `- **${t('userStory.form.storyPoints')}:** ${data.storyPoints}\n`;
    }
    if (data.tags && data.tags.trim()) {
      const tagsList = data.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
      if (tagsList.length > 0) {
        markdown += `- **${t('userStory.form.tags')}:** ${tagsList.map(tag => `\`${tag}\``).join(' ')}\n`;
      }
    }
    markdown += '\n';
  }

  if (data.acceptanceCriteria.length > 0) {
    markdown += `### ${t('userStory.acceptanceCriteria.title')}\n\n`;
    data.acceptanceCriteria.forEach((scenario, index) => {
      const scenarioLabel = t('userStory.gherkinKeywords.scenario');
      const givenLabel = t('userStory.gherkinKeywords.given');
      const whenLabel = t('userStory.gherkinKeywords.when');
      const thenLabel = t('userStory.gherkinKeywords.then');
      const andLabel = t('userStory.gherkinKeywords.and');
      markdown += '```gherkin\n';
      markdown += `${scenarioLabel}: ${index + 1}\n`;
      if (scenario.given) markdown += `${givenLabel} ${scenario.given}\n`;
      if (scenario.when) markdown += `${whenLabel} ${scenario.when}\n`;
      if (scenario.then) markdown += `${thenLabel} ${scenario.then}\n`;
      if (scenario.and && scenario.and.length > 0) {
        scenario.and.forEach(condition => {
          if (condition) markdown += `${andLabel} ${condition}\n`;
        });
      }
      markdown += '```\n\n';
    });
  }

  if (data.definitionOfDone.length > 0) {
    markdown += `### ${t('userStory.definitionOfDone.title')}\n\n`;
    data.definitionOfDone.forEach((item) => {
      const checkbox = item.completed ? '- [x]' : '- [ ]';
      markdown += `${checkbox} ${item.text}\n`;
    });
    markdown += '\n';
  }

  if (data.notes) {
    markdown += `### ${t('userStory.notes.title')}\n\n${data.notes}\n\n`;
  }

  return markdown || `*${t('userStory.preview.empty')}*`;
};

export const buildStorySummary = ({ data, t }) => {
  const asValue = data.as?.trim();
  const iWantValue = data.iWant?.trim();
  const soThatValue = data.soThat?.trim();

  if (!asValue && !iWantValue && !soThatValue) {
    return t('userStory.preview.empty');
  }

  const fallbackAs = asValue || t('userStory.form.as');
  const fallbackIWant = iWantValue || t('userStory.form.iWant');
  const fallbackSoThat = soThatValue || t('userStory.form.soThat');

  return t('userStory.summary.line', {
    as: fallbackAs,
    iWant: fallbackIWant,
    soThat: fallbackSoThat
  });
};
