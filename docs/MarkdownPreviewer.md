# MarkdownPreviewer Component

## Descrição

O `MarkdownPreviewer` é um componente React dedicado à visualização de conteúdo Markdown com formatação amigável. Ele funciona como um visualizador de markdown sem capacidade de edição, oferecendo uma interface limpa e profissional para exibir conteúdo formatado.

## Características

### ✨ Funcionalidades Principais

- **📖 Visualização de Markdown**: Renderiza markdown com formatação rica e amigável
- **📋 Cópia do Código**: Botão para copiar o código markdown bruto para o clipboard
- **🔄 Alternância de Visualização**: Alterna entre preview formatado e código markdown
- **🌓 Suporte a Temas**: Compatível com modo claro e escuro
- **♿ Acessibilidade**: Componente acessível com semântica apropriada

### 🎨 Elementos Suportados

- **Cabeçalhos**: H1, H2, H3 com bordas e estilos diferenciados
- **Texto em Negrito**: `**texto**` com destaque visual
- **Texto em Itálico**: `*texto*` com estilo de ênfase
- **Código Inline**: `` `código` `` com background destacado
- **Listas**: Suporte a listas ordenadas e não ordenadas
- **Checkboxes**: `- [x]` e `- [ ]` com checkboxes visuais
- **Citações**: `> texto` com borda lateral
- **Separadores**: `---` como linha horizontal
- **Quebras de Linha**: Suporte a quebras duplas de linha

## Props

| Prop | Tipo | Padrão | Descrição |
|------|------|---------|-----------|
| `markdown` | `string` | `''` | Conteúdo markdown a ser renderizado |
| `title` | `string` | `'Preview'` | Título do componente |
| `className` | `string` | `''` | Classes CSS adicionais |
| `showCopyButton` | `boolean` | `true` | Exibe botão de copiar |
| `showToggleButton` | `boolean` | `true` | Exibe botão de alternância |

## Uso

### Exemplo Básico

```jsx
import { MarkdownPreviewer } from '@/components/ui/MarkdownPreviewer';

function App() {
  const markdownContent = `
# Título Principal

## Seção

**Texto em negrito** e *texto em itálico*

- [x] Item concluído
- [ ] Item pendente

\`código inline\`
  `;

  return (
    <MarkdownPreviewer 
      markdown={markdownContent}
      title="Meu Preview"
    />
  );
}
```

### Exemplo Personalizado

```jsx
<MarkdownPreviewer 
  markdown={userStoryMarkdown}
  title="User Story Preview"
  showCopyButton={true}
  showToggleButton={false}
  className="max-w-4xl mx-auto"
/>
```

## Estilização

O componente utiliza classes Tailwind CSS para estilização e suporta:

- **Design Responsivo**: Adapta-se a diferentes tamanhos de tela
- **Modo Escuro**: Suporte completo ao tema escuro
- **Cores Consistentes**: Esquema de cores harmonioso
- **Tipografia**: Hierarquia tipográfica clara

## Funcionalidades Técnicas

### Parser de Markdown

- Utiliza regex para conversão markdown → HTML
- Sanitização básica de conteúdo
- Suporte a elementos HTML seguros
- Renderização otimizada

### Clipboard API

- Cópia assíncrona usando `navigator.clipboard`
- Feedback visual de sucesso
- Tratamento de erros gracioso

### Estados

- **Copied**: Indica quando o conteúdo foi copiado
- **ViewMode**: Controla alternância entre preview/código

## Integração

### No UserStoryBuilder

O componente foi integrado ao `UserStoryBuilder` substituindo o antigo `PreviewCard`:

```jsx
<MarkdownPreviewer 
  markdown={generatePreview()}
  title={t('userStory.preview.title')}
/>
```

### Dependências

- `@/components/ui/button`
- `@/components/ui/card`
- `lucide-react` (ícones)
- React 19+

## Acessibilidade

- Botões com labels descritivos
- Estrutura semântica correta
- Suporte a navegação por teclado
- Contraste de cores adequado

## Performance

- Renderização otimizada
- Evita re-renders desnecessários
- Parser de markdown eficiente
- Estados locais mínimos

---

**Implementado conforme User Story**: Componente de visualização de markdown sem edição, com botão de cópia e formatação amigável.
