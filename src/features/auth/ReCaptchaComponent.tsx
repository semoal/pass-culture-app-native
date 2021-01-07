import React, { useRef, forwardRef, useImperativeHandle } from 'react'
import { WebView } from 'react-native-webview'
import styled from 'styled-components/native'

import { env } from 'libs/environment'

export interface ReCaptchaRef {
  getReCaptchaToken: () => void
}

type ReCaptchaProps = {
  onReceiveToken: (captchaToken: string) => void
}

function getReCaptchaToken() {
  return `window.grecaptcha.execute('${env.RECAPTCHA_SITE_KEY}', { action: 'submit' }).then(
    function(args) {
      window.ReactNativeWebView.postMessage(args)
    }
  )`
}

function getReCaptchaScript() {
  return `<!DOCTYPE html><html><head>
    <script src="https://www.google.com/recaptcha/api.js?render=${env.RECAPTCHA_SITE_KEY}"></script>
    </head></html>`
}

const WithRefRecaptchaComponent: React.ForwardRefRenderFunction<ReCaptchaRef, ReCaptchaProps> = (
  props,
  forwardedRef
) => {
  const webViewRef = useRef<WebView>(null)

  useImperativeHandle(forwardedRef, () => ({
    getReCaptchaToken: () => {
      webViewRef.current?.injectJavaScript(getReCaptchaToken())
    },
  }))

  return (
    <StyledWebview
      ref={webViewRef}
      javaScriptEnabled
      originWhitelist={['*']}
      automaticallyAdjustContentInsets
      mixedContentMode={'always'}
      source={{
        html: getReCaptchaScript(),
        baseUrl: `https://www.google.com/recaptcha/api.js?render=${env.RECAPTCHA_SITE_KEY}`,
      }}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onMessage={(e: any) => {
        console.warn(e)
        props.onReceiveToken(e.nativeEvent.data)
      }}
    />
  )
}

const StyledWebview = styled(WebView)({
  flex: 0.0001,
  width: 0,
  height: 0,
})

export const ReCaptchaComponent = forwardRef<ReCaptchaRef, ReCaptchaProps>(
  WithRefRecaptchaComponent
)
