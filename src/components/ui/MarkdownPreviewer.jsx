import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Copy, Check, Eye, Code } from 'lucide-react';

/**
 * MarkdownPreviewer Component
 * 
 * Um componente de visualização de markdown que renderiza o conteúdo
 * de forma amigável e oferece funcionalidade de cópia do código markdown.
 */
function MarkdownPreviewer({
    markdown = '',
    title = 'Preview',
    className = '',
    showCopyButton = true,
    showToggleButton = true,
    progressData = null // New prop for user story progress data
}) {
    const { t } = useTranslation();
    const [copied, setCopied] = useState(false);
    const [viewMode, setViewMode] = useState('preview'); // 'preview' ou 'code'

    // Calculate progress percentage based on user story completeness
    const calculateProgress = () => {
        if (!progressData) return 0;

        const requiredFields = ['title', 'as', 'iWant', 'soThat'];
        const optionalFields = ['priority', 'storyPoints', 'tags'];
        
        let completedFields = 0;
        let totalFields = requiredFields.length + optionalFields.length;

        // Check required fields (weighted more heavily)
        requiredFields.forEach(field => {
            if (progressData[field] && progressData[field].trim()) {
                completedFields += 2; // Required fields count double
                totalFields += 1; // Add extra weight to total
            }
        });

        // Check optional fields
        optionalFields.forEach(field => {
            if (progressData[field] && progressData[field].trim()) {
                completedFields += 1;
            }
        });

        // Check acceptance criteria
        if (progressData.acceptanceCriteria && progressData.acceptanceCriteria.length > 0) {
            completedFields += 2;
        }
        totalFields += 2;

        // Check definition of done
        if (progressData.definitionOfDone && progressData.definitionOfDone.length > 0) {
            completedFields += 1;
        }
        totalFields += 1;

        // Check notes (optional)
        if (progressData.notes && progressData.notes.trim()) {
            completedFields += 0.5;
        }
        totalFields += 0.5;

        return Math.round((completedFields / totalFields) * 100);
    };

    const progressPercentage = calculateProgress();

    // Função para copiar o markdown para o clipboard
    const handleCopyMarkdown = async () => {
        try {
            await navigator.clipboard.writeText(markdown);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Error copying markdown:', err);
        }
    };

    // Função para alternar entre visualização e código
    const toggleViewMode = () => {
        setViewMode(prev => prev === 'preview' ? 'code' : 'preview');
    };

    // Parser de markdown para HTML com styling
    const renderMarkdown = (markdownText) => {
        if (!markdownText.trim()) {
            return `<p class="text-gray-500 dark:text-gray-400 italic text-center py-8">${t('userStory.preview.emptyContent')}</p>`;
        }

        return markdownText
            // Gherkin code blocks
            .replace(/```gherkin\n([\s\S]*?)\n```/g, (match, code) => {
                const formattedCode = code

                    // Scenario keywords - 2 spaces indentation, bold blue
                    .replace(/^(Scenario|Background|Scenario Outline):\s*(.*$)/gm, '<span class="text-blue-600 dark:text-blue-400 font-bold">$1:</span> <span class="text-gray-800 dark:text-gray-200">$2</span>')

                    // Step keywords - 4 spaces indentation, colored keywords
                    .replace(/^(Given|When|Then|And|But)\s+(.*$)/gm, '  <span class="text-purple-600 dark:text-purple-400 font-semibold">$1</span> <span class="text-gray-700 dark:text-gray-300">$2</span>')

                    // Examples keyword - 2 spaces indentation
                    .replace(/^(Examples):\s*(.*$)/gm, '  <span class="text-orange-600 dark:text-orange-400 font-bold">$1:</span> <span class="text-gray-800 dark:text-gray-200">$2</span>')

                    // Comments - maintain original indentation, gray italic
                    .replace(/^(\s*#.*$)/gm, '<span class="text-gray-500 dark:text-gray-400 italic">$1</span>')

                    // Table rows (for Examples) - 6 spaces indentation
                    .replace(/^(\s*\|.*\|.*$)/gm, '      <span class="text-gray-600 dark:text-gray-400">$1</span>')

                    // Convert newlines to HTML line breaks
                    .replace(/\n/g, '<br>');

                return `<div class="dark:bg-black bg-gray-100 p-2 rounded-lg mb-2">
                    <pre class="font-mono text-sm leading-relaxed text-gray-800 dark:text-gray-200 whitespace-pre-wrap">${formattedCode}</pre>
                </div>`;
            })

            // General code blocks (non-gherkin)
            .replace(/```(\w+)?\n([\s\S]*?)\n```/g, (match, language, code) => {
                const lang = language || 'code';
                const escapedCode = code
                    .replace(/&/g, '&amp;')
                    .replace(/</g, '&lt;')
                    .replace(/>/g, '&gt;')
                    .replace(/"/g, '&quot;')
                    .replace(/'/g, '&#039;');

                return `<div class="my-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                    <div class="bg-gray-100 dark:bg-gray-700 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-600">
                        ${lang}
                    </div>
                    <pre class="p-4 text-sm font-mono leading-relaxed text-gray-800 dark:text-gray-200 overflow-x-auto whitespace-pre-wrap">${escapedCode}</pre>
                </div>`;
            })

            // Headers
            .replace(/^### (.*$)/gm, '<h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3 border-b border-gray-200 dark:border-gray-700 pb-1">$1</h3>')
            .replace(/^## (.*$)/gm, '<h2 class="text-xl font-bold text-gray-900 dark:text-white mb-4 border-b border-gray-300 dark:border-gray-600 pb-2">$1</h2>')
            .replace(/^# (.*$)/gm, '<h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 border-b-2 border-blue-500 pb-3">$1</h1>')

            // Strong/Bold text
            .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800 px-1 rounded">$1</strong>')

            // Emphasis/Italic text
            .replace(/(?<!\*)\*([^*]+)\*(?!\*)/g, '<em class="italic text-blue-600 dark:text-blue-400">$1</em>')

            // Inline code
            .replace(/`([^`]+)`/g, '<code class="bg-gray-100 dark:bg-gray-800 text-red-600 dark:text-red-400 px-2 py-1 rounded text-sm font-mono">$1</code>')

            // Checkboxes completed
            .replace(/- \[x\] (.*)/g, '<div class="flex items-center gap-3 my-2 p-2 bg-green-50 dark:bg-green-900/20 rounded"><input type="checkbox" checked disabled class="h-4 w-4 text-green-600 rounded focus:ring-green-500"><span class="text-gray-700 dark:text-gray-300 line-through opacity-75">$1</span></div>')

            // Checkboxes uncompleted
            .replace(/- \[ \] (.*)/g, '<div class="flex items-center gap-3 my-2 p-2 bg-gray-50 dark:bg-gray-800 rounded"><input type="checkbox" disabled class="h-4 w-4 text-gray-400 rounded"><span class="text-gray-700 dark:text-gray-300">$1</span></div>')

            // Unordered list items
            .replace(/^- ((?!\[).*)$/gm, '<li class="text-gray-700 dark:text-gray-300 ml-6 mb-1 relative before:content-["•"] before:absolute before:-left-4 before:text-blue-500">$1</li>')

            // Ordered list items
            .replace(/^\d+\. (.*)$/gm, '<li class="text-gray-700 dark:text-gray-300 ml-6 mb-1">$1</li>')

            // Line breaks (two spaces at end of line)
            .replace(/  \n/g, '<br class="mb-2">')

            // Blockquotes
            .replace(/^> (.*)$/gm, '<blockquote class="border-l-4 border-blue-500 pl-4 italic text-gray-600 dark:text-gray-400 bg-blue-50 dark:bg-blue-900/20 py-2 my-4">$1</blockquote>')

            // Horizontal rules
            .replace(/^---$/gm, '<hr class="border-gray-300 dark:border-gray-600 my-6">')
    };

    return (
        <Card className={`w-full ${className}`}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-0">
                <CardTitle className="flex items-center gap-2">
                    {viewMode === 'preview' ? (
                        <Eye className="h-5 w-5 text-blue-500" />
                    ) : (
                        <Code className="h-5 w-5 text-green-500" />
                    )}
                    {title}
                </CardTitle>
                <div className="flex items-center gap-2">
                    {showToggleButton && (
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={toggleViewMode}
                            className="text-xs"
                        >
                            {viewMode === 'preview' ? (
                                <>
                                    <Code className="h-4 w-4 mr-1" />
                                    {t('userStory.preview.buttons.code')}
                                </>
                            ) : (
                                <>
                                    <Eye className="h-4 w-4 mr-1" />
                                    {t('userStory.preview.buttons.preview')}
                                </>
                            )}
                        </Button>
                    )}
                    {showCopyButton && (
                        <Button
                            variant="default"
                            size="sm"
                            onClick={handleCopyMarkdown}
                            disabled={!markdown.trim()}
                            className="text-xs text-white"
                        >
                            {copied ? (
                                <>
                                    <Check className="h-4 w-4 mr-1" />
                                    {t('userStory.preview.buttons.copied')}
                                </>
                            ) : (
                                <>
                                    <Copy className="h-4 w-4 mr-1" />
                                    {t('userStory.preview.buttons.copy')}
                                </>
                            )}
                        </Button>
                    )}
                </div>
            </CardHeader>
            
            {/* Progress Section */}
            {progressData && (
                <div className="px-6 pb-2">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {t('userStory.preview.progress.title')}
                        </span>
                        <div className="flex items-center gap-2">
                            <span className={`text-sm font-semibold ${
                                progressPercentage >= 80 ? 'text-green-600 dark:text-green-400' :
                                progressPercentage >= 50 ? 'text-yellow-600 dark:text-yellow-400' :
                                'text-red-600 dark:text-red-400'
                            }`}>
                                {progressPercentage}%
                            </span>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                                progressPercentage >= 80 ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' :
                                progressPercentage >= 50 ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200' :
                                'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                            }`}>
                                {progressPercentage >= 80 ? t('userStory.preview.progress.status.almostReady') :
                                 progressPercentage >= 50 ? t('userStory.preview.progress.status.inProgress') :
                                 t('userStory.preview.progress.status.starting')}
                            </span>
                        </div>
                    </div>
                    <Progress 
                        value={progressPercentage} 
                        className="h-2"
                    />
                </div>
            )}
            
            <CardContent>
                {viewMode === 'preview' ? (
                    <div
                        className="prose prose-sm max-w-none markdown-content text-sm"
                        dangerouslySetInnerHTML={{
                            __html: renderMarkdown(markdown)
                        }}
                    />
                ) : (
                    <div className="bg-gray-900 dark:bg-gray-800 rounded-lg p-4 border">
                        <pre className="text-sm text-gray-300 dark:text-gray-400 font-mono overflow-x-auto whitespace-pre-wrap">
                            {markdown || t('userStory.preview.noMarkdownContent')}
                        </pre>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}

export { MarkdownPreviewer };
