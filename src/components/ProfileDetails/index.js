import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const ProfileDetails = props => {
  const renderProfile = () => {
    const {profileDetails} = props
    const {name, profileImageUrl, shortBio} = profileDetails
const profileUrl=Cookies.get("profileUrl")
const profilename=Cookies.get("profile")
const email=Cookies.get("email")
    return (
      <div className="profile-details-container">
        <img src={profileUrl} alt="profile" className="profile-image" />
        <img src=""alt=""/>
        <h1 className="profile-name">{profilename==="null"?"Add name in GitHub Account":profilename}</h1>
        <p className="profile-bio">{email!=="null" && email}</p>
      </div>
    )
  }

  const renderProfileFailure = () => {
    const {getProfileDetails} = props
    return (
      <div className="profile-failure-container">
        <button
          className="retry-button"
          type="button"
          onClick={getProfileDetails}
        >
          Retry
        </button>
      </div>
    )
  }

  const renderProfileLoader = () => (
    <div className="loader-container-profile" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  const {profileApiStatus} = props

  switch (profileApiStatus) {
    case apiStatusConstants.inProgress:
      return renderProfileLoader()
    case apiStatusConstants.success:
      return renderProfile()
    case apiStatusConstants.failure:
      return renderProfileFailure()
    default:
      return null
  }
}

export default ProfileDetails
