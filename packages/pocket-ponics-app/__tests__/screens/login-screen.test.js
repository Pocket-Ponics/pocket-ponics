import React from 'react'
import { shallow } from 'enzyme'
import { TouchableOpacity, Platform, TextInput } from 'react-native'
import AuthUtil from '../../util/auth-util'
jest.mock('../../util/auth-util')

import LoginScreen from '../../screens/login-screen'

describe('Login Screen', () => {
	test('renders correctly', () => {
		Platform.OS = ''
		const tree = shallow(
			<LoginScreen />
		).html()
		expect(tree).toMatchSnapshot()
	})

	test('navigates to other screens', () => {
		Platform.OS = 'ios'
		const navigation = {
			navigate: jest.fn()
		}
		const tree = shallow(
			<LoginScreen navigation={navigation}/>
		)

		tree.find(TouchableOpacity).at(0).props().onPress()
		// TouchableOpacity @ 1 logs user in
		tree.find(TouchableOpacity).at(2).props().onPress()
		tree.find(TouchableOpacity).at(3).props().onPress()
		expect(navigation.navigate).toHaveBeenCalledTimes(3)
	})

	test('tries to log in with no password', () => {
		const tree = shallow(
			<LoginScreen />
		)

		tree.find(TextInput).at(0).props().onChangeText('mockUser')
		tree.find(TextInput).at(1).props().onChangeText('')
		tree.find(TouchableOpacity).at(1).props().onPress()
		expect(tree.html()).toMatchSnapshot()
	})

	test('logs in', () => {
		const tree = shallow(
			<LoginScreen  navigation={{ navigate: jest.fn() }}/>
		)
		AuthUtil.login.mockImplementation((user, pass, fn) => fn())

		tree.find(TextInput).at(0).props().onChangeText('mockUser')
		tree.find(TextInput).at(1).props().onChangeText('mockPassword')
		tree.find(TouchableOpacity).at(1).props().onPress()
		expect(AuthUtil.login).toHaveBeenCalled()
	})
})