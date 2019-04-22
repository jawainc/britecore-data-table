import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash';
import {vuexfireMutations, firebaseAction} from 'vuexfire'
import {db} from '@/firebase/';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        items: [],
        isDataLoading: false,
        isEditorSaving: false,
        activeItem: null,
        editorItem: null
    },
    mutations: {
        ...vuexfireMutations,
        setDataLoading: (state, status) => {
            state.isDataLoading = status;
        },
        setEditorSaving: (state, status) => {
            Vue.set(state.activeItem, 'saving',status);
        },
        displayEdit (state, {key}) {
            Vue.set(state.items[key], 'edit',true);
            state.activeItem = state.items[key];
            state.editorItem = _.cloneDeep(state.items[key]);
        },
        updateEdit (state, value) {
            state.editorItem.Description = value;
        },
        hideEdit (state) {
            Vue.set(state.activeItem, 'edit',false);
            state.editorItem = null;
        }
    },
    actions: {
        bindData: firebaseAction(({commit, bindFirebaseRef}) => {
            commit('setDataLoading', true);
            bindFirebaseRef('items', db)
                .then(() => {
                    commit('setDataLoading', false);
                })
        }),
        updateData: firebaseAction(({commit, state}) => {
            commit('setEditorSaving', true);
            db.child(state.activeItem['.key']).update({Description: state.editorItem.Description})
                .then(() => {
                    commit('hideEdit');
                })
        }),
        displayEditor ({commit, state}, {key}) {
            if (state.editorItem) {
                commit('hideEdit');
            }
            commit('displayEdit', {key});
        }
    },
    getters: {
        items: state => state.items,
        isDataLoading: state => state.isDataLoading,
        getEditorDescription: state => (state.editorItem) ? state.editorItem.Description : ''
    }
})
