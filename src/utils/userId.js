const USER_ID = 'user_id'

function setUId (user_id) {
  return localStorage.setItem(USER_ID, user_id)
}

function setUId_Session (user_id) {
  return sessionStorage.setItem(USER_ID, user_id)
}

function getUId () {
  return localStorage.getItem(USER_ID)
}

function getUId_Session () {
  return sessionStorage.getItem(USER_ID)
}

function clearUId () {
  return localStorage.removeItem(USER_ID)
}

function clearUId_Session () {
  return sessionStorage.removeItem(USER_ID)
}

export { setUId, getUId, clearUId, setUId_Session, getUId_Session, clearUId_Session }