import '@/styles/globals.css'
import "@/styles/quill.snow.css";
import "@fortawesome/fontawesome-svg-core/styles.css";

import type {AppProps} from 'next/app'
import {useRouter} from 'next/router'
import {config} from "@fortawesome/fontawesome-svg-core";
import {Analytics} from '@vercel/analytics/react';
import Credits from "@/components/credits";

// Tell Font Awesome to skip adding the CSS automatically
// since it's already imported above
config.autoAddCss = false;


export default function App({ Component, pageProps }: AppProps) {

  const router = useRouter()
  const pageKey = router.asPath

  return (
      <>
        <main>
          <Component  key={pageKey} {...pageProps} />
          <Credits/>
          <Analytics />
        </main>
      </>
  )
}
