import esbuild from 'esbuild'
import sveltePlugin from 'esbuild-svelte'
import sveltePreprocess from 'svelte-preprocess'
import { copy } from 'esbuild-plugin-copy'
import process from 'process'
import builtins from 'builtin-modules'
import path from 'path'

const banner = `/*
THIS IS A GENERATED/BUNDLED FILE BY ESBUILD
if you want to view the source, please visit the github repository of this plugin
*/
`

const prod = process.argv[2] === 'production'

esbuild
  .build({
    banner: {
      js: banner,
    },
    entryPoints: ['./src/main.ts'],
    bundle: true,
    external: [
      'obsidian',
      'electron',
      '@codemirror/autocomplete',
      '@codemirror/closebrackets',
      '@codemirror/collab',
      '@codemirror/commands',
      '@codemirror/comment',
      '@codemirror/fold',
      '@codemirror/gutter',
      '@codemirror/highlight',
      '@codemirror/history',
      '@codemirror/language',
      '@codemirror/lint',
      '@codemirror/matchbrackets',
      '@codemirror/panel',
      '@codemirror/rangeset',
      '@codemirror/rectangular-selection',
      '@codemirror/search',
      '@codemirror/state',
      '@codemirror/stream-parser',
      '@codemirror/text',
      '@codemirror/tooltip',
      '@codemirror/view',
      ...builtins,
    ],
    outfile: path.join('./dist', 'main.js'),
    plugins: [
      sveltePlugin({
        preprocess: sveltePreprocess(),
      }),
      copy({
        assets: {
          from: ['./assets/*'],
          to: ['./'],
        },
      }),
    ],
    format: 'cjs',
    watch: !prod,
    target: 'chrome98',
    logLevel: 'info',
    sourcemap: prod ? false : 'inline',
    treeShaking: true,
    minify: prod,
    legalComments: 'none',
  })
  .catch(() => process.exit(1))
