const fs = require('fs');
const filepath = 'src/components/tools/PremiumVideoPlayer.tsx';
let content = fs.readFileSync(filepath, 'utf-8').replace(/\r\n/g, '\n');

// The panel starts at: 
let startMatch = content.indexOf("{/* Audio Controls Panel */}");
let startIndex = content.lastIndexOf("\n", startMatch);

// It ends at:
let closingDivs = "</div>\n                                        </div>\n                                    </div>\n                                </div>\n                            </div>";
let endIndex = content.indexOf(closingDivs, startIndex) + closingDivs.length;

let panelStr = content.slice(startIndex, endIndex);

// Remove the wrongly placed panel
content = content.slice(0, startIndex) + content.slice(endIndex);

// Find the correct insertion point. We want to insert AFTER:
//                             {/* [NEW] Offline Transcript Viewer */}
//                             ...
//                         </div>
//                     )}
// Let's find:
//                             {/* [NEW] Offline Transcript Viewer */}
let offlineViewerIdx = content.indexOf("{/* [NEW] Offline Transcript Viewer */}");
// After this, look for the closing div of containerRef:
//                             )}
//                         </div>
//                     )}
let correctClosingStr = "                        </div>\n                    )}";
let targetInsert = content.indexOf(correctClosingStr, offlineViewerIdx);

if (targetInsert === -1) {
    console.error("Target insert point not found");
    process.exit(1);
}

// We also need to fix the wrapper of `fileUrl` which we replaced correctly but then the closing tag was wrong?
// Oh wait, in our previous attempt, we wrapped containerRef in:
/*
{fileUrl && (
                        <div className="flex flex-col flex-1 gap-4 min-h-0">
                            <div
                                ref={containerRef}
*/
// But we broke the end tag replacement because we matched the `{!fileUrl && (` end tag instead of the `{fileUrl && (` end tag.
// So now, `{!fileUrl && (` has the `</div>\n                    )}` replaced by the panel AND the closing </div> hook.
// Let's fix that. The `{!fileUrl && (` block ends with `<div className="mt-4 p-4...` (the panel we just removed).
// Wait, when we removed it, what was left?
/*
                                </div>
                                <p className="text-slate-300 font-medium text-lg">Upload Video File</p>
                                <p className="text-slate-500 text-sm mt-1 max-w-xs text-center">
                                    Supports MP4, WebM, MKV, AVI
                                </p>
                            </div>
                        </div>

// And then here was the panel. So the `{!fileUrl && (` block has an extra `</div>` that we added?
No, `rearrange.js` did:
content = content.replace(insertRegex, ... => `${spaces}</div>\n${audioPanelHTML}\n${spaces}</div>\n${spaces})}`);
It replaced:
                        </div>
                    )}
with:
                        </div>
                        {panel}
                        </div>
                    )}

Let's look at `{!fileUrl && (` in git diff if we could... wait, we can just replace the mess.

The `{!fileUrl && (` block SHOULD end exactly like:
                            </div>
                        </div>
                    )}

So let's just find `{!fileUrl && (` inside content, and find its end.
*/

// Easier way out: The original file has:
// 1. `{!fileUrl && ( ... )}`
// 2. `{fileUrl && ( <div ref={containerRef} ... /> )}`
// Let's just fix the entire chunk manually to be certain.

// Let's find the start of `{!fileUrl && (`
let notFileUrlStart = content.indexOf("{!fileUrl && (");
// Let's find `{/* YOUTUBE TAB */}`
let youtubeTabStart = content.indexOf("{/* YOUTUBE TAB */}");

let middleChunk = content.slice(notFileUrlStart, youtubeTabStart);
// Now we write a clean `middleChunk`.

// middleChunk should contain:
let cleanMiddle = `{!fileUrl && (
                        <div className="relative flex-1 flex flex-col items-center justify-center border-2 border-dashed border-slate-700/50 rounded-xl bg-slate-800/10 hover:bg-slate-800/30 transition-colors min-h-[300px]">
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="video/mp4,video/webm,video/mkv,video/avi"
                                onChange={handleFileChange}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                            />
                            <div className="flex flex-col items-center pointer-events-none">
                                <div className="p-4 rounded-full bg-slate-800 mb-4">
                                    <Upload className="w-8 h-8 text-slate-400" />
                                </div>
                                <p className="text-slate-300 font-medium text-lg">Upload Video File</p>
                                <p className="text-slate-500 text-sm mt-1 max-w-xs text-center">
                                    Supports MP4, WebM, MKV, AVI
                                </p>
                            </div>
                        </div>
                    )}

                    {fileUrl && (
                        <div className="flex flex-col flex-1 gap-4 min-h-0">
                            <div
                                ref={containerRef}
                                className="relative flex-1 bg-black rounded-xl overflow-hidden"
                            >
`;

let containerIdx = middleChunk.indexOf("className=\"relative flex-1 bg-black rounded-xl overflow-hidden\"");
let remainingChunk = middleChunk.slice(containerIdx + "className=\"relative flex-1 bg-black rounded-xl overflow-hidden\"".length + 1);

// wait, this is tricky. Let's just grab the video tag and everything up to offline transcript viewer.
// It's much simpler.

