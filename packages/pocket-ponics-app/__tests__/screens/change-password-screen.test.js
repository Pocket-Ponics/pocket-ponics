import React from 'react'
import { shallow } from 'enzyme'
import APIUtil from '../../util/api-util'
jest.mock('../../util/api-util')
import { TextInput, TouchableOpacity, Alert, AsyncStorage, Platform } from 'react-native'

import ChangePasswordScreen from '../../screens/change-password-screen'

jest.mock('../../util/auth-util')
jest.mock('expo-permissions')

describe('Change Password Screen', () => {
	test('renders correctly', () => {
		const tree = shallow(
			<ChangePasswordScreen />
		).html()

		expect(tree).toMatchSnapshot()
	})

	test('changes password fields', () => {
		Platform.OS = 'ios'
		const tree = shallow(<ChangePasswordScreen />)
		Platform.OS = 'mock-platform'

		tree.find(TextInput).at(0).props().onChangeText('old password')
		tree.find(TextInput).at(1).props().onChangeText('new password')
		tree.find(TextInput).at(2).props().onChangeText('new password verification')

		expect(tree.html()).toMatchSnapshot()
	})

	test('fails to submit with password < 8 char', () => {
		jest.spyOn(Alert, 'alert').mockReturnValue(true)

		const tree = shallow(<ChangePasswordScreen />)

		tree.find(TextInput).at(1).props().onChangeText('short')
		tree.find(TouchableOpacity).at(0).props().onPress()

		expect(Alert.alert).toHaveBeenCalled()
		expect(APIUtil.changePassword).not.toHaveBeenCalled()
	})

	test('fails to submit with passwords not matching', () => {
		jest.spyOn(Alert, 'alert').mockReturnValue(true)

		const tree = shallow(<ChangePasswordScreen />)

		tree.find(TextInput).at(1).props().onChangeText('new password')
		tree.find(TextInput).at(2).props().onChangeText('new password verification')
		tree.find(TouchableOpacity).at(0).props().onPress()

		expect(Alert.alert).toHaveBeenCalled()
		expect(APIUtil.changePassword).not.toHaveBeenCalled()
	})

	test('fails to submit with server error', async () => {
		jest.spyOn(Alert, 'alert').mockReturnValue(true)
		APIUtil.changePassword.mockResolvedValueOnce({
			201: 'Invalid Password'
		})

		const navigation = {
			navigate: jest.fn(),
			getParam: () => 'mockUserName'
		}

		const tree = shallow(<ChangePasswordScreen navigation={navigation}/>)

		tree.find(TextInput).at(1).props().onChangeText('new password')
		tree.find(TextInput).at(2).props().onChangeText('new password')
		await tree.find(TouchableOpacity).at(0).props().onPress()

		expect(APIUtil.changePassword).toHaveBeenCalled()
		expect(navigation.navigate).not.toHaveBeenCalled()
	})

	test('sucessfully changes password', async () => {
		jest.spyOn(Alert, 'alert').mockReturnValue(true)
		jest.spyOn(AsyncStorage, 'setItem').mockResolvedValue(true)

		APIUtil.changePassword.mockResolvedValueOnce({
			200: 'Sucessfully saved password'
		})

		const navigation = {
			navigate: jest.fn(),
			getParam: () => 'mockUserName'
		}

		const tree = shallow(<ChangePasswordScreen navigation={navigation}/>)

		tree.find(TextInput).at(1).props().onChangeText('new password')
		tree.find(TextInput).at(2).props().onChangeText('new password')
		await tree.find(TouchableOpacity).at(0).props().onPress()

		expect(APIUtil.changePassword).toHaveBeenCalled()
		expect(AsyncStorage.setItem).toHaveBeenCalledTimes(2)
	})
})