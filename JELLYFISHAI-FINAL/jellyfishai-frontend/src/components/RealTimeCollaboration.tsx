import React, { useState, useEffect, useRef } from 'react';
import { Users, MessageCircle, Eye, Edit3, Share2, Crown, Wifi, WifiOff, AlertTriangle, CheckCircle } from 'lucide-react';

interface Collaborator {
  id: string;
  name: string;
  avatar: string;
  color: string;
  cursor: { x: number; y: number } | null;
  isActive: boolean;
  role: 'owner' | 'editor' | 'viewer';
}

interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: Date;
  position: { line: number; column: number };
  resolved: boolean;
}

interface RealTimeCollaborationProps {
  projectId: string;
  currentUser: string;
  onCodeChange: (code: string) => void;
  code: string;
}

export const RealTimeCollaboration: React.FC<RealTimeCollaborationProps> = ({
  projectId,
  currentUser,
  onCodeChange,
  code
}) => {
  const [collaborators, setCollaborators] = useState<Collaborator[]>([
    {
      id: '1',
      name: 'You',
      avatar: '👤',
      color: '#3B82F6',
      cursor: null,
      isActive: true,
      role: 'owner'
    },
    {
      id: '2',
      name: 'Sarah Chen',
      avatar: '👩‍💻',
      color: '#10B981',
      cursor: { x: 150, y: 200 },
      isActive: true,
      role: 'editor'
    },
    {
      id: '3',
      name: 'Alex Kumar',
      avatar: '👨‍💻',
      color: '#F59E0B',
      cursor: { x: 300, y: 150 },
      isActive: true,
      role: 'viewer'
    }
  ]);

  const [comments, setComments] = useState<Comment[]>([
    {
      id: '1',
      author: 'Sarah Chen',
      content: 'Should we add error handling here?',
      timestamp: new Date(Date.now() - 300000),
      position: { line: 15, column: 10 },
      resolved: false
    },
    {
      id: '2',
      author: 'Alex Kumar',
      content: 'Great implementation! 🚀',
      timestamp: new Date(Date.now() - 180000),
      position: { line: 25, column: 5 },
      resolved: true
    }
  ]);

  const [isConnected, setIsConnected] = useState(true);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [selectedLine, setSelectedLine] = useState<number | null>(null);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const editorRef = useRef<HTMLTextAreaElement>(null);

  // Simulate real-time cursor movements
  useEffect(() => {
    const interval = setInterval(() => {
      setCollaborators(prev => prev.map(collab => {
        if (collab.id !== '1' && collab.isActive) {
          return {
            ...collab,
            cursor: {
              x: Math.random() * 600 + 50,
              y: Math.random() * 400 + 100
            }
          };
        }
        return collab;
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Simulate connection status changes
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() < 0.05) { // 5% chance to simulate connection issues
        setIsConnected(false);
        setTimeout(() => setIsConnected(true), 2000);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const addComment = () => {
    if (newComment.trim() && selectedLine !== null) {
      const comment: Comment = {
        id: Date.now().toString(),
        author: currentUser,
        content: newComment,
        timestamp: new Date(),
        position: { line: selectedLine, column: 0 },
        resolved: false
      };
      setComments(prev => [...prev, comment]);
      setNewComment('');
      setSelectedLine(null);
    }
  };

  const resolveComment = (commentId: string) => {
    setComments(prev => prev.map(comment => 
      comment.id === commentId ? { ...comment, resolved: true } : comment
    ));
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'owner': return <Crown className="w-3 h-3 text-yellow-400" />;
      case 'editor': return <Edit3 className="w-3 h-3 text-green-400" />;
      case 'viewer': return <Eye className="w-3 h-3 text-blue-400" />;
      default: return null;
    }
  };

  const formatTimeAgo = (date: Date) => {
    const minutes = Math.floor((Date.now() - date.getTime()) / 60000);
    if (minutes < 1) return 'just now';
    if (minutes < 60) return `${minutes}m ago`;
    return `${Math.floor(minutes / 60)}h ago`;
  };

  return (
    <div className="relative">
      {/* Connection Status */}
      <div className={`fixed top-4 right-4 z-50 flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium ${
        isConnected 
          ? 'bg-green-500/20 text-green-300 border border-green-500/30' 
          : 'bg-red-500/20 text-red-300 border border-red-500/30'
      }`}>
        {isConnected ? <Wifi className="w-4 h-4" /> : <WifiOff className="w-4 h-4" />}
        <span>{isConnected ? 'Connected' : 'Reconnecting...'}</span>
      </div>

      {/* Collaborators Bar */}
      <div className="bg-white/10 backdrop-blur-md border-b border-white/20 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h3 className="text-white font-semibold">Live Collaboration</h3>
            <div className="flex items-center space-x-2">
              {collaborators.map((collab) => (
                <div
                  key={collab.id}
                  className="relative group"
                  title={`${collab.name} (${collab.role})`}
                >
                  <div 
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium border-2 ${
                      collab.isActive ? 'border-green-400' : 'border-gray-400'
                    }`}
                    style={{ backgroundColor: collab.color + '20', color: collab.color }}
                  >
                    {collab.avatar}
                  </div>
                  <div className="absolute -top-1 -right-1">
                    {getRoleIcon(collab.role)}
                  </div>
                  {collab.isActive && (
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowComments(!showComments)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                showComments 
                  ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' 
                  : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
            >
              <MessageCircle className="w-4 h-4" />
              <span>Comments ({comments.filter(c => !c.resolved).length})</span>
            </button>
            <button
              onClick={() => setShareModalOpen(true)}
              className="flex items-center space-x-2 px-3 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg transition-colors"
            >
              <Share2 className="w-4 h-4" />
              <span>Share</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex">
        {/* Code Editor with Cursors */}
        <div className="flex-1 relative">
          <div className="relative">
            <textarea
              ref={editorRef}
              value={code}
              onChange={(e) => onCodeChange(e.target.value)}
              onClick={(e) => {
                const textarea = e.target as HTMLTextAreaElement;
                const lines = textarea.value.substr(0, textarea.selectionStart).split('\n');
                setSelectedLine(lines.length);
              }}
              className="w-full h-96 bg-black/20 border border-white/20 rounded-lg p-4 text-white font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Start coding... Your collaborators will see changes in real-time!"
            />

            {/* Collaborative Cursors */}
            {collaborators.map((collab) => 
              collab.cursor && collab.id !== '1' && collab.isActive ? (
                <div
                  key={collab.id}
                  className="absolute pointer-events-none z-10"
                  style={{
                    left: collab.cursor.x,
                    top: collab.cursor.y,
                    transform: 'translate(-50%, -50%)'
                  }}
                >
                  <div 
                    className="w-0.5 h-5 animate-pulse"
                    style={{ backgroundColor: collab.color }}
                  ></div>
                  <div 
                    className="absolute -top-6 left-0 px-2 py-1 rounded text-xs text-white font-medium whitespace-nowrap"
                    style={{ backgroundColor: collab.color }}
                  >
                    {collab.name}
                  </div>
                </div>
              ) : null
            )}
          </div>

          {/* Line Comments Indicators */}
          <div className="absolute left-2 top-4 space-y-5">
            {comments.map((comment) => (
              <div
                key={comment.id}
                className={`w-3 h-3 rounded-full cursor-pointer ${
                  comment.resolved ? 'bg-green-400' : 'bg-yellow-400'
                }`}
                style={{ marginTop: `${comment.position.line * 20}px` }}
                title={`${comment.author}: ${comment.content}`}
                onClick={() => setShowComments(true)}
              />
            ))}
          </div>
        </div>

        {/* Comments Sidebar */}
        {showComments && (
          <div className="w-80 bg-white/10 backdrop-blur-md border-l border-white/20 p-4">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-white font-semibold">Comments</h4>
              <button
                onClick={() => setShowComments(false)}
                className="text-white/60 hover:text-white"
              >
                ×
              </button>
            </div>

            {/* Add Comment */}
            {selectedLine && (
              <div className="mb-4 p-3 bg-blue-500/20 border border-blue-500/30 rounded-lg">
                <div className="text-blue-300 text-sm mb-2">
                  Adding comment to line {selectedLine}
                </div>
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="w-full p-2 bg-white/10 border border-white/20 rounded text-white text-sm resize-none"
                  rows={2}
                />
                <div className="flex justify-end space-x-2 mt-2">
                  <button
                    onClick={() => setSelectedLine(null)}
                    className="px-3 py-1 text-white/70 hover:text-white text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={addComment}
                    className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded text-sm"
                  >
                    Comment
                  </button>
                </div>
              </div>
            )}

            {/* Comments List */}
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {comments.map((comment) => (
                <div
                  key={comment.id}
                  className={`p-3 rounded-lg border ${
                    comment.resolved 
                      ? 'bg-green-500/10 border-green-500/30' 
                      : 'bg-white/5 border-white/20'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-white font-medium text-sm">{comment.author}</span>
                      <span className="text-white/60 text-xs">Line {comment.position.line}</span>
                    </div>
                    <span className="text-white/60 text-xs">{formatTimeAgo(comment.timestamp)}</span>
                  </div>
                  <p className="text-white/80 text-sm mb-2">{comment.content}</p>
                  {!comment.resolved && (
                    <button
                      onClick={() => resolveComment(comment.id)}
                      className="flex items-center space-x-1 text-green-400 hover:text-green-300 text-xs"
                    >
                      <CheckCircle className="w-3 h-3" />
                      <span>Resolve</span>
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Share Modal */}
      {shareModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 max-w-md w-full">
            <h3 className="text-white font-semibold mb-4">Share Project</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-white/80 text-sm mb-2">Project Link</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={`https://jellyfishai.dev/project/${projectId}`}
                    readOnly
                    className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded text-white text-sm"
                  />
                  <button className="px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded text-sm">
                    Copy
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-white/80 text-sm mb-2">Invite by Email</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="email"
                    placeholder="colleague@company.com"
                    className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded text-white text-sm"
                  />
                  <select className="px-3 py-2 bg-white/10 border border-white/20 rounded text-white text-sm">
                    <option value="editor">Editor</option>
                    <option value="viewer">Viewer</option>
                  </select>
                </div>
                <button className="w-full mt-2 px-3 py-2 bg-green-500 hover:bg-green-600 text-white rounded text-sm">
                  Send Invite
                </button>
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={() => setShareModalOpen(false)}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};