import {db} from "./firebaseApp";
import {collection, deleteDoc, doc, getDocs, setDoc} from "firebase/firestore";
import {toast} from 'react-hot-toast';

export const addCityForUser = async (userId: string | undefined, cityData: any) => {
    if (!userId) {
        toast.error('User ID is not specified.');
        return;
    }

    try {
        const userDocRef = doc(db, userId, cityData.name.toLowerCase(),);

        await setDoc(userDocRef,
            {
                city: cityData.name.toLowerCase(),
                coord: cityData.coord
            });

        toast.success('City successfully added for the user.');
    } catch (error) {
        toast.error('Error adding city for the user!');
    }
};

export const deleteCityForUser = async (userId: string | undefined, cityName: string) => {
    if (!userId) {
        toast.error('User ID is not specified.');
        return;
    }

    try {
        const userDocRef = doc(db, userId, cityName.toLowerCase());
        await deleteDoc(userDocRef);

        toast.success(`City ${cityName} successfully deleted for the user.`);
    } catch (error) {
        toast.error('Error deleting city for the user!');
    }
};

export const getUserData = async (userId: string | undefined) => {
    if (!userId) {
        toast.error('User ID is not specified.');
        return null;
    }

    try {
        const userCollectionRef = collection(db, userId);
        const querySnapshot = await getDocs(userCollectionRef);
        const userData: any[] = [];

        querySnapshot.forEach((doc) => {
            userData.push(doc.data());
        });
        return userData;
    } catch (error) {
        toast.error('Error getting user data!');
        return null;
    }
};
