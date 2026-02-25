const fs = require('fs');
const filepath = 'src/components/tools/PremiumVideoPlayer.tsx';
let content = fs.readFileSync(filepath, 'utf-8').replace(/\r\n/g, '\n');

let startIndex = content.lastIndexOf("\n", content.indexOf("{/* Audio Controls Panel */}"));

// Find the sequence of divs closing the main overlay control bar
let closingSequence = `</div>\n                                    </div>\n                                </div>\n                            </div>`;
let endSeqIndex = content.indexOf(closingSequence, startIndex);

if (startIndex === -1 || endSeqIndex === -1) {
    console.error("Indices not found", { startIndex, endSeqIndex });
    process.exit(1);
}

let audioPanelHTML = content.slice(startIndex, endSeqIndex);

if (!audioPanelHTML.includes("Safe Boost Volume")) {
    console.error("Block extraction failed!");
    process.exit(1);
}

// 1. Remove it from original source
content = content.slice(0, startIndex) + content.slice(endSeqIndex);

// 2. Wrap the video container
content = content.replace(
    /\{fileUrl && \([\s]*<div[\s]*ref=\{containerRef\}[\s]*className="relative flex-1 bg-black rounded-xl overflow-hidden"/m,
    `{fileUrl && (\n                        <div className="flex flex-col flex-1 gap-4 min-h-0">\n                            <div\n                                ref={containerRef}\n                                className="relative flex-1 bg-black rounded-xl overflow-hidden"`
);

// 3. Insert it after the video container
const insertRegex = /([ \t]*)<\/div>\n[ \t]*\)\}/;
content = content.replace(insertRegex, (match, spaces) => {
    return `${spaces}</div>\n${audioPanelHTML}\n${spaces}</div>\n${spaces})}`;
});

fs.writeFileSync(filepath, content);
console.log("Successfully extracted and moved!");
