module.exports = {
  PROD_FLAG: 'prod',
  SASS: {
    INPUT: './src/styles/**/*.scss',
    OUTPUT: './web/styles',
    OPTIONS: {
      ERR_LOG_TO_CONSOLE: true,
      OUTPUT_STYLE: 'expanded'
    }
  },
  JS: {
    INPUT: './src/js/main.js',
    INPUT_GLOB: './src/js/**/*.js',
    OUTPUT_DIR: './web/js/',
    OUTPUT_FILE: 'bundle.js'
  },
  HTML: {
    INPUT: './src/templates', // templates for rendering engine to know about
    INPUT_PAGES: './src/pages/**/*.html', // pages to compile
    INPUT_ALL: './src/**/*.html', // files to watch
    OUTPUT: './web',
    OUTPUT_GLOB: './web/*.html'
  },
  DATA: {
    INPUT: './src/data/pageData.json'
  },
  TEMPLATE_PATHS: {
    JS: {
      DEV: 'js/bundle.js',
      PROD: 'js/bundle.min.js'
    },
    CSS: {
      DEV: 'styles/screen.css',
      PROD: 'styles/screen.min.css'
    }
  },
  MEDIA: {
    INPUT: './src/media/**/*',
    OUTPUT: './web/media'
  }
}