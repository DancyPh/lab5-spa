import { useState } from 'react'
import {useContext, createContext} from 'react'
import {db} from '../firebase/firebaseConfig'
import { collection, doc, getDocs, query, where } from 'firebase/firestore';
import { Alert } from 'react-native';

// tao context
const AuthContext = createContext();
// tao provider su dung AuthContext
export const AuthProvider = ({children}) => {
    // set sate user
    const [user, setUser] = useState(null);

    // Hàm đăng nhập với 3 đối số: username, password, navigation
    const login = async (username, password, navigation) => {
        // Kiểm tra user admin
        if (username === 'admin' && password === '123456') {
            setUser({name: 'Admin', username: 'admin', role: 'admin' });
            navigation.navigate('Admin');
            console.log(user)
        } else {
            try {
                // Tạo truy vấn để tìm tài liệu với username
                const usersRef = collection(db, 'users');
                const q = query(usersRef, where('username', '==', username));
                const querySnapshot = await getDocs(q);
    
                // Kiểm tra xem có tài liệu nào được tìm thấy không
                if (querySnapshot.empty) {
                    Alert.alert('Tài khoản không tồn tại !');
                    return;
                }
    
                // Lấy tài liệu đầu tiên từ kết quả
                const userDoc = querySnapshot.docs[0];
                const userData = userDoc.data();
                const userId = userDoc.id
    
                // Kiểm tra mật khẩu
                if (userData && userData.password === password) {
                    setUser({id: userId ,name: userData.name, username, role: 'customer' });
                    navigation.navigate('Customer');
                    console.log(username, 'đã đăng nhập !');
                    console.log(user)
                } else {
                    Alert.alert('Sai mật khẩu !');
                }
            } catch (e) {
                Alert.alert('Lỗi khi đăng nhập', e.message);
                console.log(e.message);
            }
        }
    };
    

    return (
        <AuthContext.Provider value={{user, login}}>
            {children}
        </AuthContext.Provider>
    )
};
// su dung useContext cho AuthContext
export const useAuth = () => {
    return useContext(AuthContext);
}