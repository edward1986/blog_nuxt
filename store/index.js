import Vuex from "vuex";
const createStore = () => {
  return new Vuex.Store({
    state: {
      loadedPosts: [],
      token: null
    },
    mutations: {
      setPosts(state, posts) {
        state.loadedPosts = posts;
      },
      addPost(state, post) {
        state.loadedPosts.push(post)
      },
      editPost(state, editedPost) {
        const postIndex = state.loadedPosts.findIndex(
          post => post.id === editedPost.id);
        state.loadedPosts[postIndex] = editedPost
      },
      setToken(state, token) {
        state.token = token;
      },
    },
    actions: {
      nuxtServerInit(vuexContext, context) {
          return this.$axios
            .$get("/posts.json")
            .then(res => {
              const postsArray = [];
              for (const key in res) {
                postsArray.push({ ...res[key], id: key });
              }
              vuexContext.commit("setPosts", postsArray);
            })
            .catch(e => context.error(e));
        },
      setPosts(vuexContext, posts) {
        vuexContext.commit("setPosts", posts);
      },
      addPost(vuexContext, post) {
        const createdPost = {
          ...post,
          updatedDate: new Date()
        }
        return this.$axios.$post( "/posts.json?auth=" +
          vuexContext.state.token, createdPost)
          .then(data => {
            vuexContext.commit('addPost', {...createdPost, id: data.name})
          })
          .catch(e => console.log(e));
      },
      editPost(vuexContext, editedPost) {
        return this.$axios.$put("/posts/" +
          editedPost.id +
          ".json?auth=" +
          vuexContext.state.token, editedPost)
          .then(data => {
            vuexContext.commit('editPost', editedPost)
          })
          .catch(e => console.log(e))
      },
      authenticateUser(vuexContext, authData){
        let authUrl =
          "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=" +
          process.env.fbAPIKey;
        if (!authData.isLogin) {
          authUrl = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=" + process.env.fbAPIKey;
        }
        return this.$axios.$post(authUrl, {
          email: authData.email,
          password: authData.password,
          returnSecureToken: true
        }).then(result => {
          console.log(result)
           vuexContext.commit("setToken", result.idToken);
        }).catch(e => console.log(e))
      }
    },
    getters: {
      loadedPosts(state) {
        return state.loadedPosts;
      }
    }
  });
};

export default createStore;
