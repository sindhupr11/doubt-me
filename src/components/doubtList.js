import React from "react";

function DoubtList({ doubts }) {
  return (
    <div className="h-[calc(100vh-320px)] overflow-y-auto scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-200">
      <div className="space-y-6">
        {doubts.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            No doubts yet. Be the first to post one!
          </div>
        ) : (
          doubts.map((doubt) => (
            <div key={doubt.id} className="flex flex-col animate-fadeIn">
              <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white p-4 rounded-2xl rounded-tl-none max-w-[80%] self-start shadow-lg hover:shadow-xl transition-shadow">
                <p className="text-white text-base leading-relaxed">
                  {doubt.text}
                </p>
                
                {doubt.image ? (
                  <div className="mt-3">
                      <img 
                        src={doubt.image} 
                        alt="Attached image"
                        className="max-w-full rounded-lg max-h-[300px] object-contain hover:opacity-95 transition-opacity cursor-pointer"
                      />
                  </div>
                ) : doubt.fileUrl || doubt.file ? (
                  <div className="mt-3">
                    <a
                      href={doubt.fileUrl || doubt.file}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-3 py-2 bg-blue-600/30 rounded-lg text-blue-50 hover:bg-blue-600/40 transition-colors"
                    >
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                        />
                      </svg>
                      View Attachment
                    </a>
                  </div>
                ) : null}
                
                <div className="text-xs text-blue-100 mt-2 font-medium">
                  {new Date(doubt.createdAt).toLocaleString()}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default DoubtList;
