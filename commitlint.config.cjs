// Context: ITAC CoE Smart Commits validation
// Smart Commits format: "type((PROJECT-NNN) - HU(PROJECT-NNN)): description"
require('dotenv').config();

const PROJECT = process.env.PROJECT_JIRA || 'API';
const SCOPE_PATTERN = new RegExp(`^\\(${PROJECT}-\\d+\\) - HU\\(${PROJECT}-\\d+\\)$`);

module.exports = {
  parserPreset: {
    parserOpts: {
      headerPattern: /^(\w+)\((.+)\): (.+)$/,
      headerCorrespondence: ['type', 'scope', 'subject'],
    },
  },
  rules: {
    'type-enum': [
      2,
      'always',
      ['feat', 'fix', 'chore', 'docs', 'style', 'refactor', 'test', 'perf', 'ci', 'revert'],
    ],
    'type-case': [2, 'always', 'lower-case'],
    'subject-empty': [2, 'never'],
    'scope-match': [2, 'always'],
  },
  plugins: [
    {
      rules: {
        'scope-match': ({ scope }) => {
          if (!scope) return [false, `Scope is required. Expected: (${PROJECT}-NNN) - HU(${PROJECT}-NNN)`];
          const valid = SCOPE_PATTERN.test(scope);
          return [valid, `Scope must match: (${PROJECT}-NNN) - HU(${PROJECT}-NNN). Got: ${scope}`];
        },
      },
    },
  ],
};
