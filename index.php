---
layout: null
---


<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, minimal-ui">
    <title>Audio Player</title>

    <link rel="mask-icon" href="{{ '/favicon.svg' | prepend: site.url }}" color="#{{ site.color }}">

    <link rel="author" href="/humans.txt">
    <link rel="manifest" type="application/manifest+json" href="/manifest.json">

    <meta name="author" content="{{ site.author.name }}">
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="application-name" content="{{ site.title }}">
    <meta name="apple-mobile-web-app-title" content="{{ site.title }}">
    <meta name="msapplication-starturl" content="{{ site.url }}">
    <meta name="description" content="{{ site.lede }}">
    <meta name="theme-color" content="#{{ site.color }}">
    <meta name="msapplication-navbutton-color" content="#{{ site.color }}">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">

    <meta http-equiv="cleartype" content="on">

    <!-- The URL -->
    <link rel="canonical" href="{{ site.url }}">
    <!-- Twitter Microdata -->
    <meta name="twitter:card" content="summary">
    <meta name="twitter:creator" content="{{ site.author.twitter }}">
    <meta name="twitter:title" content="{{ site.title }}">
    <meta name="twitter:description" content="{{ site.lede }}">
    <meta name="twitter:domain" content="{{ site.url | remove: 'http://' | remove: 'https://' }}">
    <meta name="twitter:widgets:theme" content="light">
    <meta name="twitter:widgets:link-color" content="#{{ site.color }}">
    <meta name="twitter:widgets:border-color" content="#{{ site.color }}">
    <!-- OpenGraph Microdata -->
    <meta property="og:type" content="website">
    <meta property="og:title" content="{{ site.title }}">
    <meta property="og:description" content="{{ site.lede }}">
    <meta property="og:locale" content="{{ site.language }}">
    <meta property="og:url" content="{{ site.url }}">
    <!-- Google Sitelinks Searchbox -->
    <script type="application/ld+json">
        {
            "@context": "http://schema.org",
            "@type": "WebSite",
            "url": "{{ site.url }}",
            "headline": "{{ site.title }}",
            "description": "{{ site.lede }}",
            "author": {
                "@type": "Person",
                "name": "{{ site.author.name }}"
            }
        }
    </script>

    <link rel="stylesheet" href="/main.min.css">
</head>

<body>

    <h1>{{ site.title }}</h1>

    <section class="container">
        <div>
            <?php
                $url = isset($_GET['url']) ? $_GET['url'] : '';
                $autoplay = isset($_GET['autoplay']) ? ' autoplay' : '';
                $autoplayChecked = !empty($autoplay) ? ' checked' : '';
                echo '<audio src="' . $url . '" preload controls' . $autoplay . '></audio>';
                echo '<form action="/" method="post">';
                echo '<label for="url">URL:</label>';
                echo '<input type="url" placeholder="Paste the URL here!" name="url" id="url" value="' . $url . '" required />';
                echo '<label for="autoplay">Autoplay? <input type="checkbox" name="autoplay" id="autoplay" ' . $autoplayChecked . '/></label>';
                echo '<br>';
                echo '<button type="submit">Submit</button>';
                echo '</form>';
            ?>
        </div>
        <div>
            <p>Drag the <a href="javascript:{% include audioControls.min.js %}" title="Audio Controls">Bookmarklet</a> to your bookmarks bar or check this out on <a href="https://github.com/chrisburnell/audioControls" rel="external">GitHub</a>.</p>
            <dl class="audio-controls-legend">
                <dt>Play / Pause</dt>
                <dd>Spacebar / K</dd>
                <dt>Rewind 5s</dt>
                <dd>◀</dd>
                <dt>Forward 5s</dt>
                <dd>▶</dd>
                <dt>Rewind 10s</dt>
                <dd>J</dd>
                <dt>Forward 10s</dt>
                <dd>L</dd>
                <dt>Forward 30s</dt>
                <dd>Page Up</dd>
                <dt>Rewind 30s</dt>
                <dd>Page Down</dd>
                <dt>Seek</dt>
                <dd>0–9</dd>
                <dt>Volume Up 5%</dt>
                <dd>▲</dd>
                <dt>Volume Down 5%</dt>
                <dd>▼</dd>
                <dt>Mute / Unmute</dt>
                <dd>M</dd>
                <dt>Playback Rate Down 25%</dt>
                <dd>A / -</dd>
                <dt>Playback Rate Up 25%</dt>
                <dd>D / =</dd>
                <dt>Playback Rate Set to 100%</dt>
                <dd>S</dd>
            </dl>
        </div>
    </section>

    <script src="audioControls.min.js"></script>

</body>
</html>
