import React from 'react'
import '@testing-library/jest-dom'
import { screen, render, act } from '@testing-library/react'
import { i18n } from '@lingui/core'
import { I18nProvider } from '@lingui/react'

import { messages } from '../locales/en/messages'
import { messages as cyMessages } from '../locales/cy/messages'
import Home from './index'

const useRouter = jest.spyOn(require('next/router'), 'useRouter')

i18n.load({
    en: messages,
    cy: cyMessages
})

const I18nWrapper = () => (
    <I18nProvider i18n={i18n}>
        <Home />
    </I18nProvider>
)

describe('translation strings render correctly', () => {
    beforeEach(() => {
        useRouter.mockImplementationOnce(() => ({
            query: {},
        }))
    })

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('Content should be translated correctly in English' , () => {
        act(() => {
            i18n.activate('en')
        })
        render(<I18nWrapper />);
        expect(screen.getByText('NextJs Lingui Example')).toBeInTheDocument()

    });

    it('Content should be translated correctly in Welsh', () => {
        act(() => {
            i18n.activate('cy')
        })

        render(<I18nWrapper />);
        expect(screen.getByText('Enghraifft Iaith NextJs')).toBeInTheDocument();
    });

})

