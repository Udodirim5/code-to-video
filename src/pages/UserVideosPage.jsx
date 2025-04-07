import { useState, useEffect } from "react";
import styled from "styled-components";
import {
  Play,
  Trash2,
  Upload,
  Download,
  HardDrive,
  Cloud,
  Plus,
  AlertTriangle,
  Menu,
  X as CloseIcon,
} from "lucide-react";
import { Link } from "react-router-dom";

// Dummy data
const dummyUser = {
  name: "Nnodimele Udodirim",
  isPremium: false,
  storageUsed: "1.2/3 videos",
  joinDate: "2023-10-15",
  tier: "free",
  avatar: "/images/udodirim.jpg",
  storageLimit: 3,
};

const dummyVideos = [
  {
    id: 1,
    title: "React Tutorial",
    duration: "2:45",
    created: "2023-11-20",
    isLocal: true,
    thumbnail:
      "https://images.pexels.com/photos/31224887/pexels-photo-31224887/free-photo-of-serene-deer-in-historical-japanese-temple-grounds.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    videoContent:
      "https://videos.pexels.com/video-files/2098989/2098989-uhd_2560_1440_30fps.mp4",
  },
  {
    id: 2,
    title: "CSS Animation",
    duration: "1:30",
    created: "2023-11-15",
    isLocal: true,
    thumbnail:
      "https://images.pexels.com/photos/1535907/pexels-photo-1535907.jpeg",
    videoContent:
      "https://videos.pexels.com/video-files/30654656/13118921_2560_1440_24fps.mp4",
  },
  {
    id: 3,
    title: "Node.js Demo",
    duration: "4:12",
    created: "2023-11-10",
    isLocal: false,
    thumbnail:
      "https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg",
    videoContent:
      "https://videos.pexels.com/video-files/4334565/4334565-uhd_2560_1440_24fps.mp4",
  },
];

const UserVideosPage = () => {
  const [user, setUser] = useState(dummyUser);
  const [videos, setVideos] = useState(dummyVideos);
  const [selectedVideo, setSelectedVideo] = useState(dummyVideos[0]);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [showLimitModal, setShowLimitModal] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth > 768) {
        setMobileSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowWidth <= 768;

  const handleSave = () => {
    if (!user.isPremium && videos.filter((v) => v.isLocal).length >= 3) {
      setShowLimitModal(true);
      return;
    }
    // Save logic would go here
  };

  const handleDelete = (id) => {
    setVideos(videos.filter((video) => video.id !== id));
    if (selectedVideo?.id === id) {
      setSelectedVideo(
        videos.length > 1 ? videos.find((v) => v.id !== id) : null
      );
    }
  };

  const toggleSidebar = () => {
    setMobileSidebarOpen(!mobileSidebarOpen);
  };

  return (
    <Dashboard>
      <MobileHeader>
        <MobileMenuButton onClick={toggleSidebar}>
          {mobileSidebarOpen ? <CloseIcon size={24} /> : <Menu size={24} />}
        </MobileMenuButton>
        <MobileTitle>My Videos</MobileTitle>
        <MobileUpgradeButton onClick={() => setShowUpgradeModal(true)}>
          Upgrade
        </MobileUpgradeButton>
      </MobileHeader>

      <Content>
        <Sidebar $mobileOpen={mobileSidebarOpen}>
          <SidebarHeader>
            <NewVideoButton>
              <Link to="/app">
                <Plus size={16} />
                New Video
              </Link>
            </NewVideoButton>
            {isMobile && (
              <CloseSidebarButton onClick={toggleSidebar}>
                <CloseIcon size={20} />
              </CloseSidebarButton>
            )}
          </SidebarHeader>

          <VideoList>
            {videos.map((video) => (
              <VideoItem
                key={video.id}
                $active={selectedVideo?.id === video.id}
                onClick={() => {
                  setSelectedVideo(video);
                  if (isMobile) setMobileSidebarOpen(false);
                }}
              >
                <VideoThumbnail src={video.thumbnail} alt={video.title} />
                <VideoInfo>
                  <VideoTitle>{video.title}</VideoTitle>
                  <VideoMeta>
                    {video.duration} •{" "}
                    {new Date(video.created).toLocaleDateString()}
                    {video.isLocal ? (
                      <HardDrive size={14} />
                    ) : (
                      <Cloud size={14} />
                    )}
                  </VideoMeta>
                </VideoInfo>
              </VideoItem>
            ))}
          </VideoList>

          <StorageIndicator $isPremium={user.isPremium}>
            {user.isPremium ? (
              <>
                <Cloud size={16} />
                <span>Cloud Storage: {user.storageUsed}</span>
              </>
            ) : (
              <>
                <HardDrive size={16} />
                <span>Local Storage: {user.storageUsed}</span>
              </>
            )}
          </StorageIndicator>
        </Sidebar>

        <MainContent>
          {selectedVideo ? (
            <>
              <VideoContainer>
                <VideoPreview>
                  {playing ? (
                    <video src={selectedVideo.videoContent} controls autoPlay />
                  ) : (
                    <>
                      <img
                        src={selectedVideo.thumbnail}
                        alt={selectedVideo.title}
                      />
                      <PlayButton onClick={() => setPlaying(true)}>
                        <Play size={48} fill="#fff" />
                      </PlayButton>
                    </>
                  )}
                </VideoPreview>

                <VideoActions>
                  <ActionButton>
                    <Download size={18} />
                    <span>Export</span>
                  </ActionButton>
                  <ActionButton>
                    <Upload size={18} />
                    <span>Share</span>
                  </ActionButton>
                  <ActionButton
                    $danger
                    onClick={() => handleDelete(selectedVideo.id)}
                  >
                    <Trash2 size={18} />
                    <span>Delete</span>
                  </ActionButton>
                </VideoActions>

                <VideoDetails>
                  <h3>{selectedVideo.title}</h3>
                  <DetailRow>
                    <DetailLabel>Created:</DetailLabel>
                    <DetailValue>
                      {new Date(selectedVideo.created).toLocaleDateString()}
                    </DetailValue>
                  </DetailRow>
                  <DetailRow>
                    <DetailLabel>Duration:</DetailLabel>
                    <DetailValue>{selectedVideo.duration}</DetailValue>
                  </DetailRow>
                  <DetailRow>
                    <DetailLabel>Storage:</DetailLabel>
                    <DetailValue>
                      {selectedVideo.isLocal ? "Local Device" : "Cloud"}
                    </DetailValue>
                  </DetailRow>
                </VideoDetails>
              </VideoContainer>
            </>
          ) : (
            <EmptyState>
              <h3>No video selected</h3>
              <p>Select a video from the sidebar or create a new one</p>
            </EmptyState>
          )}
        </MainContent>
      </Content>

      {/* Desktop Footer */}
      <DesktopFooter>
        <UserInfo>
          <Avatar src={user.avatar} alt={user.name} />
          <div>
            <UserName>{user.name}</UserName>
            <UserSince>
              Member since {new Date(user.joinDate).toLocaleDateString()}
            </UserSince>
          </div>
        </UserInfo>
        {!user.isPremium && (
          <UpgradeButton onClick={() => setShowUpgradeModal(true)}>
            Upgrade to Premium
          </UpgradeButton>
        )}
      </DesktopFooter>

      {/* Modals */}
      {showUpgradeModal && (
        <ModalOverlay>
          <Modal>
            <ModalHeader>
              <h3>Upgrade to Premium</h3>
              <button onClick={() => setShowUpgradeModal(false)}>×</button>
            </ModalHeader>
            <ModalBody>
              <p>Get access to all premium features:</p>
              <ul>
                <li>Unlimited cloud storage</li>
                <li>Higher resolution exports</li>
                <li>Advanced editing tools</li>
                <li>Shareable links</li>
              </ul>
              <ButtonGroup>
                <UpgradeButton $large>Upgrade Now</UpgradeButton>
              </ButtonGroup>
            </ModalBody>
          </Modal>
        </ModalOverlay>
      )}

      {showLimitModal && (
        <ModalOverlay>
          <Modal>
            <ModalHeader>
              <AlertTriangle color="#ffcc00" size={20} />
              <h3>Storage Limit Reached</h3>
              <button onClick={() => setShowLimitModal(false)}>×</button>
            </ModalHeader>
            <ModalBody>
              <p>
                You've reached the limit of 3 local videos. Upgrade to premium
                for unlimited cloud storage or delete existing videos to free up
                space.
              </p>
              <ButtonGroup>
                <ActionButton onClick={() => setShowLimitModal(false)}>
                  Manage Videos
                </ActionButton>
                <UpgradeButton
                  $large
                  onClick={() => {
                    setShowLimitModal(false);
                    setShowUpgradeModal(true);
                  }}
                >
                  Upgrade to Premium
                </UpgradeButton>
              </ButtonGroup>
            </ModalBody>
          </Modal>
        </ModalOverlay>
      )}
    </Dashboard>
  );
};

// Styled Components
const Dashboard = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: var(--color-background);
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
`;

const MobileHeader = styled.header`
  display: none;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: var(--color-surface);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;

  @media (max-width: 768px) {
    display: flex;
  }
`;

const MobileMenuButton = styled.button`
  background: none;
  border: none;
  color: var(--color-text);
  cursor: pointer;
`;

const MobileTitle = styled.h1`
  font-size: 1.2rem;
  margin: 0;
`;

const MobileUpgradeButton = styled.button`
  background-color: #6c5ce7;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
`;

const Content = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
  position: relative;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Sidebar = styled.aside`
  width: 300px;
  border-right: 1px solid var(--color-border-light);
  display: flex;
  flex-direction: column;
  padding: 1rem;
  overflow-y: auto;
  background-color: var(--color-surface);
  transition: transform 0.3s ease;
  z-index: 10;

  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    width: 80%;
    max-width: 320px;
    transform: translateX(${(props) => (props.$mobileOpen ? "0" : "-100%")});
    box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
  }
`;

const SidebarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const CloseSidebarButton = styled.button`
  background: none;
  border: none;
  color: var(--color-text-secondary);
  cursor: pointer;
  padding: 0.5rem;
`;

const VideoList = styled.div`
  flex: 1;
  overflow-y: auto;
`;

const VideoItem = styled.div`
  display: flex;
  gap: 0.75rem;
  padding: 0.75rem;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 0.5rem;
  background-color: ${(props) =>
    props.$active ? "var(--color-surface-alt)" : "transparent"};
  border: 1px solid
    ${(props) =>
      props.$active ? "var(--color-border)" : "var(--color-border-light)"};

  &:hover {
    background-color: var(--color-surface-alt);
  }
`;

const VideoThumbnail = styled.img`
  width: 80px;
  height: 45px;
  border-radius: 2px;
  object-fit: cover;
`;

const VideoInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const VideoTitle = styled.h4`
  margin: 0;
  font-size: 0.9rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: var(--color-text);
`;

const VideoMeta = styled.p`
  margin: 0.25rem 0 0;
  font-size: 0.8rem;
  color: var(--color-text-secondary);
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const StorageIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem;
  margin-top: auto;
  background-color: var(--color-surface-alt);
  border: 2px solid
    ${(props) =>
      props.$isPremium ? `var(--color-success)` : `var(--color-accent)`};
  border-radius: 4px;
  font-size: 0.9rem;
  color: ${(props) =>
    props.$isPremium ? `var(--color-success)` : `var(--color-accent)`};
`;

const MainContent = styled.main`
  flex: 1;
  padding: 1.5rem;
  overflow-y: auto;
  background-color: var(--color-background);

  @media (min-width: 768px) {
    padding: 2rem;
  }
`;

const VideoContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const VideoPreview = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 1.5rem;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  video {
    width: 100%;
    height: auto;
    border-radius: var(--radius-lg);
    display: block;
  }

  img {
    width: 100%;
    display: block;
  }
`;

const PlayButton = styled.button`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.6);
  border: none;
  border-radius: 50%;
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
    transform: translate(-50%, -50%) scale(1.1);
  }
`;

const VideoActions = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;

  @media (min-width: 480px) {
    gap: 1rem;
  }
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: ${(props) =>
    props.$danger ? "#fff0f0" : "var(--color-surface)"};
  color: ${(props) =>
    props.$danger ? `var(--color-error)` : "var(--color-text)"};
  border: 1px solid
    ${(props) =>
      props.$danger ? "var(--color-error-light)" : "var(--color-border)"};
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.9rem;

  span {
    @media (max-width: 480px) {
      display: none;
    }
  }

  &:hover {
    background-color: ${(props) =>
      props.$danger ? "#ffebee" : "var(--color-surface-alt)"};
    border-color: ${(props) =>
      props.$danger ? "var(--color-error)" : "var(--color-border-hover)"};
  }
`;

const VideoDetails = styled.div`
  background-color: var(--color-surface);
  padding: 1.25rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

  h3 {
    margin-top: 0;
    margin-bottom: 1rem;
    color: var(--color-text);
  }

  @media (min-width: 480px) {
    padding: 1.5rem;
  }
`;

const DetailRow = styled.div`
  display: flex;
  margin-bottom: 0.5rem;
`;

const DetailLabel = styled.span`
  font-weight: 600;
  color: var(--color-text);
  min-width: 80px;
`;

const DetailValue = styled.span`
  color: var(--color-text-secondary);
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 60vh;
  color: var(--color-text-secondary);
  text-align: center;

  h3 {
    margin-bottom: 0.5rem;
    color: var(--color-text);
  }
`;

const DesktopFooter = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: var(--color-surface);
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    display: none;
  }
`;

const NewVideoButton = styled.div`
  a {
    all: unset;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    width: 100%;
    padding: 0.75rem;
    margin-bottom: 1rem;
    background-color: #6c5ce7;
    color: white;
    border: none;
    border-radius: 4px;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
      background-color: #5649c0;
    }
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 50%;
`;

const UserName = styled.h3`
  margin: 0;
  font-size: 1rem;
`;

const UserSince = styled.p`
  margin: 0;
  font-size: 0.8rem;
  color: var(--color-text-secondary);
`;

const UpgradeButton = styled.button`
  background-color: #6c5ce7;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: background-color 0.2s;

  &:hover {
    background-color: #5649c0;
  }

  ${(props) =>
    props.$large &&
    `
    padding: 0.75rem 1.5rem;
    margin-top: 1rem;
  `}
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const Modal = styled.div`
  background-color: var(--color-surface);
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  overflow: hidden;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem;
  border-bottom: 1px solid var(--color-border-light);

  h3 {
    margin: 0;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--color-text);
  }

  button {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: var(--color-text-secondary);
  }
`;

const ModalBody = styled.div`
  padding: 1.25rem;

  p {
    margin-top: 0;
    color: var(--color-text-secondary);
  }

  ul {
    padding-left: 1.5rem;
    margin: 1rem 0;
    color: var(--color-text-secondary);
  }

  @media (min-width: 480px) {
    padding: 1.5rem;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
  flex-direction: column;

  @media (min-width: 480px) {
    flex-direction: row;
    justify-content: flex-end;
  }
`;

export default UserVideosPage;

// const UserVideosPage = () => {
//   const { user } = useAuth();
//   const [videos, setVideos] = useState([]);
//   const [selectedVideo, setSelectedVideo] = useState(null);

//   useEffect(() => {
//     if (user.isPremium) {
//       // Fetch from API
//       api.getVideos().then(setVideos);
//     } else {
//       // Load from localStorage
//       setVideos(localStorageHelper.getVideos());
//     }
//   }, [user]);

//   const handleSave = async (videoData) => {
//     if (user.isPremium) {
//       const savedVideo = await api.saveVideo(videoData);
//       setVideos(prev => [...prev, savedVideo]);
//     } else {
//       try {
//         localStorageHelper.saveVideo(videoData);
//         setVideos(localStorageHelper.getVideos());
//       } catch (error) {
//         showStorageLimitModal();
//       }
//     }
//   };

//   return (
//     <div className="dashboard">
//       <Header user={user} />

//       <div className="content">
//         <Sidebar>
//           <VideoList
//             videos={videos}
//             onSelect={setSelectedVideo}
//             userTier={user.tier}
//           />
//           <StorageStatus user={user} videos={videos} />
//         </Sidebar>

//         <MainContent>
//           {selectedVideo ? (
//             <VideoPreview
//               video={selectedVideo}
//               onSave={handleSave}
//               userTier={user.tier}
//             />
//           ) : (
//             <EmptyState onCreateNew={startNewVideo} />
//           )}
//         </MainContent>
//       </div>
//     </div>
//   );
// };
