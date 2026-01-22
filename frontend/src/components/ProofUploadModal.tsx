/**
 * Proof Upload Modal - Camera/file capture and AR sticker picker
 * Props: questId, isOpen, onClose, onUploadSuccess
 * Features: camera capture, file fallback, caption, AR sticker picker, progress bar
 * Behavior: 0-100% progress animation, disabled submit while uploading
 */

import React, { useState, useRef } from 'react';
import '../styles/animations.css';

export interface ProofUploadModalProps {
  questId: string;
  isOpen: boolean;
  onClose: () => void;
  onUploadSuccess: (proof: { mediaUrl: string; caption?: string }) => void;
}

const ProofUploadModal: React.FC<ProofUploadModalProps> = ({
  questId,
  isOpen,
  onClose,
  onUploadSuccess,
}) => {
  const [uploadMode, setUploadMode] = useState<'camera' | 'file' | 'select'>('select');
  const [caption, setCaption] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedSticker, setSelectedSticker] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Mock stickers for AR picker
  const stickers = [
    { id: '1', emoji: '♻️', label: 'Recycle' },
    { id: '2', emoji: '🌱', label: 'Growth' },
    { id: '3', emoji: '🌍', label: 'Earth' },
    { id: '4', emoji: '💧', label: 'Water' },
  ];

  const handleCameraOpen = async () => {
    setUploadMode('camera');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error('Camera access denied:', err);
      setUploadMode('file');
    }
  };

  const handleCapture = () => {
    if (videoRef.current && canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
        simulateUpload();
      }
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadMode('select');
      simulateUpload();
    }
  };

  const simulateUpload = async () => {
    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 30;
      });
    }, 300);

    // Complete upload after 2 seconds
    setTimeout(() => {
      setIsUploading(false);
      setUploadProgress(100);

      // Mock proof data
      onUploadSuccess({
        mediaUrl: `https://via.placeholder.com/400?text=${questId}`,
        caption: caption || 'EcoQuest completed! 🌿',
      });

      // Reset and close
      setTimeout(() => {
        setCaption('');
        setSelectedSticker(null);
        setUploadProgress(0);
        setUploadMode('select');
        onClose();
      }, 500);
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overlay-enter">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative bg-white rounded-3xl shadow-2xl max-w-sm w-full p-6 modal-enter max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close upload modal"
          className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 z-10"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 className="text-xl font-bold text-gray-900 mb-4 mt-2">Upload Proof</h2>

        {/* Mode Selection */}
        {uploadMode === 'select' && (
          <div className="space-y-3 mb-6">
            <button
              onClick={handleCameraOpen}
              className="w-full px-4 py-3 rounded-lg border-2 border-green-500 text-green-600 font-semibold hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
              aria-label="Take photo with camera"
            >
              📷 Take Photo
            </button>
            <button
              onClick={() => {
                setUploadMode('file');
                fileInputRef.current?.click();
              }}
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
              aria-label="Choose file from device"
            >
              📁 Choose File
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,video/*"
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>
        )}

        {/* Camera View */}
        {uploadMode === 'camera' && (
          <div className="mb-6">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full rounded-xl bg-black"
            />
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => setUploadMode('select')}
                className="flex-1 px-4 py-2 rounded-lg border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleCapture}
                className="flex-1 px-4 py-2 rounded-lg bg-green-500 text-white font-semibold hover:bg-green-600"
                aria-label="Capture photo"
              >
                Capture
              </button>
            </div>
          </div>
        )}

        {/* Caption Input */}
        {!isUploading && (
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Add Caption (Optional)
            </label>
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Tell us about your eco-action..."
              maxLength={150}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
              rows={3}
            />
            <p className="text-xs text-gray-500 mt-1">{caption.length}/150</p>
          </div>
        )}

        {/* AR Sticker Picker */}
        {!isUploading && (
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Add Sticker (AR) ✨
            </label>
            <div className="grid grid-cols-4 gap-2">
              {stickers.map((sticker) => (
                <button
                  key={sticker.id}
                  onClick={() => setSelectedSticker(sticker.id)}
                  className={`p-3 rounded-lg transition ${
                    selectedSticker === sticker.id
                      ? 'bg-green-500 ring-2 ring-green-600'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                  aria-label={`Select ${sticker.label} sticker`}
                  aria-pressed={selectedSticker === sticker.id}
                >
                  <span className="text-2xl">{sticker.emoji}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Progress Bar */}
        {isUploading && (
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-semibold text-gray-700">Uploading...</p>
              <p className="text-sm font-semibold text-green-600">
                {Math.round(uploadProgress)}%
              </p>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-green-500 to-cyan-500 progress-fill transition-all"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* Upload/Cancel Buttons */}
        {!isUploading && (
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 rounded-lg border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500"
              aria-label="Cancel upload"
            >
              Cancel
            </button>
            <button
              onClick={simulateUpload}
              disabled={isUploading}
              className="flex-1 px-4 py-3 rounded-lg bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-green-700 disabled:opacity-50 transition"
              aria-label="Upload proof"
            >
              Upload
            </button>
          </div>
        )}
        {/* Hidden canvas for camera capture */}
        <canvas ref={canvasRef} className="hidden" width={400} height={300} />
      </div>
    </div>
  );
};

export default ProofUploadModal;
