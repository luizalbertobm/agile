#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

// Função para extrair chaves de tradução do código
function extractTranslationKeys(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  // Updated regex to be more specific: looks for {t('key')} or t('key') with word boundaries
  const regex = /(?:\{|[\s\(])t\('([^']+)'\)/g;
  const keys = [];
  let match;
  
  while ((match = regex.exec(content)) !== null) {
    keys.push(match[1]);
  }
  
  return [...new Set(keys)]; // Remove duplicatas
}

// Função para obter chaves de um objeto JSON recursivamente
function getKeysFromObject(obj, prefix = '') {
  const keys = [];
  
  for (const key in obj) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      keys.push(...getKeysFromObject(obj[key], fullKey));
    } else {
      keys.push(fullKey);
    }
  }
  
  return keys;
}

// Carregar arquivos de tradução
const ptTranslations = JSON.parse(fs.readFileSync('src/i18n/locales/pt.json', 'utf8'));
const enTranslations = JSON.parse(fs.readFileSync('src/i18n/locales/en.json', 'utf8'));

// Extrair chaves usadas no código
const usedKeys = [
  ...extractTranslationKeys('src/components/UserStory/UserStoryBuilder.jsx'),
  ...extractTranslationKeys('src/components/common/Navbar/Navbar.jsx'),
  ...extractTranslationKeys('src/components/common/Sidebar/Sidebar.jsx'),
  ...extractTranslationKeys('src/components/common/LanguageSelector/LanguageSelector.jsx'),
  ...extractTranslationKeys('src/components/ui/MarkdownPreviewer.jsx')
].filter((key, index, array) => array.indexOf(key) === index); // Remove duplicatas

// Extrair chaves disponíveis nos arquivos de tradução
const ptKeys = getKeysFromObject(ptTranslations);
const enKeys = getKeysFromObject(enTranslations);

console.log('🌍 RELATÓRIO DE INTERNACIONALIZAÇÃO\n');
console.log('=====================================\n');

console.log(`📊 ESTATÍSTICAS:`);
console.log(`   Chaves usadas no código: ${usedKeys.length}`);
console.log(`   Chaves em PT: ${ptKeys.length}`);
console.log(`   Chaves em EN: ${enKeys.length}\n`);

// Chaves faltando em PT
const missingInPt = usedKeys.filter(key => !ptKeys.includes(key));
if (missingInPt.length > 0) {
  console.log('❌ CHAVES FALTANDO EM PORTUGUÊS:');
  missingInPt.forEach(key => console.log(`   - ${key}`));
  console.log('');
}

// Chaves faltando em EN
const missingInEn = usedKeys.filter(key => !enKeys.includes(key));
if (missingInEn.length > 0) {
  console.log('❌ CHAVES FALTANDO EM INGLÊS:');
  missingInEn.forEach(key => console.log(`   - ${key}`));
  console.log('');
}

// Chaves não utilizadas em PT
const unusedInPt = ptKeys.filter(key => !usedKeys.includes(key));
if (unusedInPt.length > 0) {
  console.log('⚠️  CHAVES NÃO UTILIZADAS EM PORTUGUÊS:');
  unusedInPt.forEach(key => console.log(`   - ${key}`));
  console.log('');
}

// Chaves não utilizadas em EN
const unusedInEn = enKeys.filter(key => !usedKeys.includes(key));
if (unusedInEn.length > 0) {
  console.log('⚠️  CHAVES NÃO UTILIZADAS EM INGLÊS:');
  unusedInEn.forEach(key => console.log(`   - ${key}`));
  console.log('');
}

// Verificar se todas as chaves estão sincronizadas
const ptOnlyKeys = ptKeys.filter(key => !enKeys.includes(key));
const enOnlyKeys = enKeys.filter(key => !ptKeys.includes(key));

if (ptOnlyKeys.length > 0) {
  console.log('🔄 CHAVES APENAS EM PORTUGUÊS:');
  ptOnlyKeys.forEach(key => console.log(`   - ${key}`));
  console.log('');
}

if (enOnlyKeys.length > 0) {
  console.log('🔄 CHAVES APENAS EM INGLÊS:');
  enOnlyKeys.forEach(key => console.log(`   - ${key}`));
  console.log('');
}

// Resultado final
if (missingInPt.length === 0 && missingInEn.length === 0) {
  console.log('✅ TODAS AS CHAVES NECESSÁRIAS ESTÃO DISPONÍVEIS!');
} else {
  console.log('🔧 AÇÃO NECESSÁRIA: Algumas chaves estão faltando.');
}

if (ptOnlyKeys.length === 0 && enOnlyKeys.length === 0) {
  console.log('✅ ARQUIVOS DE TRADUÇÃO SINCRONIZADOS!');
} else {
  console.log('🔧 AÇÃO NECESSÁRIA: Arquivos de tradução não estão sincronizados.');
}

console.log('\n=====================================');
