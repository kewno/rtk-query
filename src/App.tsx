import React, {useEffect, useState} from 'react';
import './App.css';
import {fetchUsers} from "./store/reudcers/userSlice/api";
import {useAppDispatch, useAppSelector} from "./hooks/redux";
import {postAPI} from "./services/postServices";
import {IPost} from "./models/IPost";

function App() {
    const dispatch = useAppDispatch()
    const {users} = useAppSelector((state: any) => state.userReducer)
    useEffect(() => {
        dispatch(fetchUsers())
    }, [])


    //const a =
    const {data: posts, error, isLoading} = postAPI.useFetchAllPostsQuery(100)
    const [createPost, {}] = postAPI.useCreatePostMutation()
    const [deletePost, {}] = postAPI.useDeletePostMutation()

    // useEffect(() => {
    //     console.log('postsposts', posts)
    // }, [posts])

    const handleCreate = async () => {
        const title = prompt()
        await createPost({title, body: title} as IPost)
    }

    const handleDelete = async (id: string | number) => {
        await deletePost(id).unwrap() // доп метод для доп логики
    }

    const getPosts = async (url: string) => {
        const res = await fetch(url)
        const posts = await res.json()
        //debugger
        return posts
    }
    const [zalupa, setZalupa] = useState(null)
    const postsFetch = getPosts('https://jsonplaceholder.typicode.com/posts')
    postsFetch.then(res => setZalupa(res))
    // let a = postsFetch.then((res) => {
    //     let a = res
    //     return res
    //     //debugger
    // })
    console.log('postsFetch', postsFetch, zalupa)
    return (
        <div className="App">
            <div>
                <button onClick={handleCreate}>Создать задачу</button>
            </div>
            {isLoading && <h2>Идет загрузка...</h2>}
            {error && <h2>Ошибка в запросе</h2>}
            {/*{JSON.stringify(users, null, 4)}*/}
            <div>
                {posts && posts.map((el: IPost) => (
                    <div>
                        <span>{el.body}</span>
                        <button onClick={() => handleDelete(el.id)}>DELETE</button>
                    </div>
                ))}
            </div>
            {JSON.stringify(posts, null, 4)}
        </div>
    );
}

export default App;
