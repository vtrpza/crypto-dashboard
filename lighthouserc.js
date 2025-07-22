module.exports = {
  ci: {
    collect: {
      url: [
        'http://localhost:3000',
        'http://localhost:3000/search',
        'http://localhost:3000/coin/bitcoin'
      ],
      startServerCommand: 'npm start',
      startServerReadyPattern: 'Ready on',
      startServerReadyTimeout: 60000,
      numberOfRuns: 3,
    },
    assert: {
      preset: 'lighthouse:recommended',
      assertions: {
        'categories:performance': ['warn', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'categories:best-practices': ['warn', { minScore: 0.9 }],
        'categories:seo': ['warn', { minScore: 0.9 }],
        'csp-xss': 'off',
        'unused-javascript': 'off',
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};