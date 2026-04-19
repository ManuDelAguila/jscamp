process.loadEnvFile() // es cargar las variables de entorno del .env

import { test } from 'node:test'
import assert from 'node:assert'

import { Stagehand } from '@browserbasehq/stagehand'

const normalizeOllamaModelName = (modelName) =>
    modelName.startsWith('ollama/') ? modelName : `ollama/${modelName}`

const OLLAMA_BASE_URL = process.env.OLLAMA_BASE_URL ?? process.env.OLLAMA_HOST ?? 'http://127.0.0.1:11434'
const OLLAMA_MODEL = normalizeOllamaModelName(process.env.OLLAMA_MODEL ?? 'qwen3:8b')
const EXPECTED_ERROR = 'No se encontró ningún ticket con ese código. Recuerda que es sensible a mayúsculas y minúsculas.'

test('Un usuario puede entrar a la JSConf y adquirir dos entradas por €287.98', async () => {
    const stagehand = new Stagehand({
        env: 'LOCAL',
        verbose: 2,
        model: {
            modelName: OLLAMA_MODEL,
            baseURL: OLLAMA_BASE_URL
        }
    })

    try {
        console.log(`Stagehand usando ${OLLAMA_MODEL} en ${OLLAMA_BASE_URL}`)

        await stagehand.init()

        const [page] = stagehand.context.pages()

        await page.goto('https://jsconf.es/certificado')
        await page.waitForLoadState('domcontentloaded')
        await page.waitForTimeout(2000)

        console.log(`URL actual: ${page.url()}`)
        console.log(`Frames detectados: ${page.frames().length}`)

        await stagehand.act('Type in the input field for the certificate value "33335"')
        await stagehand.act('Click the "Obtener Certificado" button')
        await page.waitForTimeout(2000)

        const { extraction } = await stagehand.extract('Extract the visible validation error message shown on the page after submitting an invalid certificate code.')
        console.log('Error:', extraction)

        assert.strictEqual(extraction, EXPECTED_ERROR)
    } finally {
        await stagehand.close().catch(() => {})
    }
})
