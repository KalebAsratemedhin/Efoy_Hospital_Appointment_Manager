import React, { useEffect, useState } from 'react';
import {
  CallControls,
  CallingState,
  SpeakerLayout,
  StreamCall,
  StreamTheme,
  StreamVideo,
  StreamVideoClient,
  useCallStateHooks,
  User,
} from '@stream-io/video-react-sdk';
import '@stream-io/video-react-sdk/dist/css/styles.css';
import { FaPhoneSlash } from 'react-icons/fa';

interface VideoCallProps {
  callId: string;
  apiKey: string;
  token: string;
  userId: string;
  userName: string;
  onCallEnd: () => void;
}

const VideoCall: React.FC<VideoCallProps> = ({
  callId,
  apiKey,
  token,
  userId,
  userName,
  onCallEnd,
}) => {
  const [client, setClient] = useState<StreamVideoClient | null>(null);
  const [call, setCall] = useState<any>(null);
  const [isConnecting, setIsConnecting] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    
    const initializeCall = async () => {
      try {
        // Create user object
        const user: User = {
          id: userId,
          name: userName,
          image: `https://getstream.io/random_svg/?id=${userId}&name=${userName}`,
        };

        // Create Stream client
        const streamClient = new StreamVideoClient({ apiKey, user, token });
        
        if (!isMounted) {
          streamClient.disconnectUser();
          return;
        }
        
        setClient(streamClient);

        // Create and join call
        const streamCall = streamClient.call('default', callId);
        await streamCall.join({ create: true });
        
        if (!isMounted) {
          streamCall.leave();
          streamClient.disconnectUser();
          return;
        }
        
        setCall(streamCall);
        setIsConnecting(false);
      } catch (err) {
        console.error('Failed to initialize video call:', err);
        if (isMounted) {
          setError('Failed to connect to video call. Please try again.');
          setIsConnecting(false);
        }
      }
    };

    initializeCall();

    // Cleanup function
    return () => {
      isMounted = false;
      if (call) {
        call.leave();
      }
      if (client) {
        client.disconnectUser();
      }
    };
  }, []); // Empty dependency array - only run once on mount

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
          <div className="text-center">
            <div className="text-red-500 text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Connection Error</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (isConnecting || !client || !call) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold mb-2">Connecting to Call</h2>
          <p className="text-gray-300">Please wait while we establish your video connection...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <StreamVideo client={client}>
        <StreamCall call={call}>
          <CallUI onCallEnd={onCallEnd} />
        </StreamCall>
      </StreamVideo>
    </div>
  );
};

const CallUI: React.FC<{ onCallEnd: () => void }> = ({ onCallEnd }) => {
  const { useCallCallingState, useParticipantCount } = useCallStateHooks();
  const callingState = useCallCallingState();
  const participantCount = useParticipantCount();

  if (callingState !== CallingState.JOINED) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold mb-2">Joining Call</h2>
          <p className="text-gray-300">Please wait...</p>
        </div>
      </div>
    );
  }

  return (
    <StreamTheme>
      <div className="relative h-screen">
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 z-10 bg-black bg-opacity-50 text-white p-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold">Video Consultation</h1>
              <p className="text-sm text-gray-300">
                {participantCount} participant{participantCount !== 1 ? 's' : ''} in call
              </p>
            </div>
            <button
              onClick={onCallEnd}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
            >
              <FaPhoneSlash />
              End Call
            </button>
          </div>
        </div>

        {/* Video Layout */}
        <div className="h-full pt-20">
          <SpeakerLayout participantsBarPosition="bottom" />
        </div>

        {/* Call Controls */}
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <CallControls />
        </div>
      </div>
    </StreamTheme>
  );
};

export default VideoCall; 