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
    markdown += `**${t('userStory.form.as')}** ${data.as || t('userStory.placeholders.pending')}  \n`;
    markdown += `**${t('userStory.form.iWant')}** ${data.iWant || t('userStory.placeholders.pending')}  \n`;
    markdown += `**${t('userStory.form.soThat')}** ${data.soThat || t('userStory.placeholders.pending')}\n\n`;
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

  return `As ${fallbackAs}, I want ${fallbackIWant} so that ${fallbackSoThat}`;
};
