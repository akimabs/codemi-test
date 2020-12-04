const initialState = {
  data: [
    {
      username: 'codemian',
      password: 'rahasia',
      avatar:
        'https://cdn.iconscout.com/icon/free/png-512/avatar-370-456322.png',
    },
    {
      username: 'river',
      password: 'rahasia',
      avatar:
        'https://www.setiabudiecovalley.com/uploads/male-avatar-icon-png-7-3ar.png',
    },
  ],
  isDoneOnboarding: false,
  token: null,
  profile: null,
};

const auth = (state = initialState, action: any) => {
  switch (action.type) {
    case 'SET_ONBOARDING':
      return {
        ...state,
        isDoneOnboarding: true,
      };

    case 'SET_AUTH':
      return {
        ...state,
        token: action.payload,
      };

    case 'SET_DATA':
      return {
        ...state,
        profile: action.payload,
      };

    default:
      return state;
  }
};

export default auth;
