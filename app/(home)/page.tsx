"use client"

import Image from "next/image"

import styles from "./page.module.css"

function HomePage() {
  return (
    <main className={styles.main}>
      {/* description header */}
      <div className={styles.description}>
        <p className=" cursor-pointer">
          <a href="/assets/extension.zip" download>
            Download&nbsp;<code className={styles.code}>Extension.zip</code>
          </a>
        </p>

        <div>
          <a
            href="https://opencord.xyz"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{" "}
            <Image
              src="/opencord.svg"
              alt="opencord Logo"
              className={styles.opencordLogo}
              width={100}
              height={22}
              priority
            />
          </a>
        </div>
      </div>

      {/* center logo */}
      <div className={styles.center}>
        <Image
          className={styles.logo}
          src="/opencord-ai.svg"
          alt="opencord.ai Logo"
          width={200}
          height={40}
          priority
        />
      </div>

      {/* bottom grid */}
      <div className={styles.grid}>
        <a
          data-testid="Twitter_Agent_Start"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => {
            const pluginInstalled = localStorage.getItem("AI_PLUGIN_INSTALLED")
            if (!pluginInstalled) {
              alert("please install extension first")
            }
          }}
        >
          <h2>
            Twitter Agent <span>-&gt;</span>
          </h2>
          <p>
            An automated tool that assists in managing and operating your
            Twitter account.
          </p>
        </a>

        <a
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => {
            alert("Coming soon, stay tuned")
          }}
        >
          <h2>
            Video Agent <span>-&gt;</span>
          </h2>
          <p>An automated tool for generating videos effortlessly.</p>
        </a>

        <a
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => {
            alert("Coming soon, stay tuned")
          }}
        >
          <h2>
            Common Agent <span>-&gt;</span>
          </h2>
          <p>
            A versatile automation tool for handling diverse tasks efficiently.
          </p>
        </a>
      </div>
    </main>
  )
}

export default HomePage
