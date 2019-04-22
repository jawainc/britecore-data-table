import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import store from '@/store'

const localVue = createLocalVue();
localVue.use(Vuex);

let storeItems = [
    {
        '.key': 0,
        Description: 'Lorem Ipsum'
    },
    {
        '.key': 1,
        Description: 'Lorem Ipsum'
    }
];



describe ('Table Store', () => {

    beforeEach(() => {
        store.state.items = storeItems;
    });


    it('Set active and edit item when "displayEditor" is dispatched', () => {
        store.dispatch('displayEditor', {key: 0});
        expect(store.state.activeItem).toEqual(storeItems[0]);
        expect(store.state.editorItem).toEqual(storeItems[0]);
    });

    it('Sets edit property to true when "displayEditor" is dispatched', () => {
        store.dispatch('displayEditor', {key: 1});
        expect(store.state.items[1].edit).toBeTruthy();
    });

    it('update editorItem Description when "updateEdit" is committed', () => {
        store.dispatch('displayEditor', {key: 1});
        store.commit('updateEdit', 'New Value');
        expect(store.state.editorItem.Description).toBe('New Value');
    });

    it('Sets editorItem to null and activeItem edit property to false when "hideEdit" is committed', () => {
        store.dispatch('displayEditor', {key: 0});
        store.commit('hideEdit');
        expect(store.state.items[0].edit).toBeFalsy();
        expect(store.state.editorItem).toBeNull();
    });

    it('Sets saving property when "setEditorSaving" is committed', () => {
        store.dispatch('displayEditor', {key: 1});
        store.commit('setEditorSaving', true);
        expect(store.state.items[1].saving).toBeTruthy();
    });

    it('Sets isDataLoading when "setDataLoading" is committed', () => {
        store.commit('setDataLoading', true);
        expect(store.state.isDataLoading).toBeTruthy();
    });
});
