export const state = () => ({
    images: []
})

export const mutations = {
    setImages (state, images) {
        state.images = images
    }
}

export const actions = {
    async fetch({commit}) {
        const images = await this.$axios.$get('https://boiling-refuge-66454.herokuapp.com/images')
        commit('setImages',images)
}
}

export const getters = {
    images: s => s.images
}
