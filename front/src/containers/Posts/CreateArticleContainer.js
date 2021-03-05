import React, { useCallback } from 'react';
import CreateArticle from '../../components/UserContainers/CreateArticle/CreateArticle';
import { getOnePost, createPostRequest, updatePostRequest } from './hooks/articleRequests';
import PropTypes from 'prop-types';
import {
    useQuery,
    useMutation
} from 'react-query';

function CreateArticleContainer({ id }) {

    const { data: response, isFetching } = useQuery(['posts', id], () => getOnePost({ id }),
        {
            enabled: !!id,
        });

    const postData = response?.data || { title: '', content: '', access: 'all' };

    const { mutate: updatePost } = useMutation(updatePostRequest);
    const { mutate: createPost } = useMutation(createPostRequest);

    const onSubmitCreate = useCallback(async formData => {
        try {
            const data = await createPost({ formData });

            //console.log(data);
        } catch (e) {
            console.log(e);
        }
    }, [createPost]);

    const onSubmitUpdate = useCallback(async formData => {
        try {
            const data = await updatePost({ id, formData });

            //console.log(data);
        } catch (e) {
            console.log(e);
        }
    }, [updatePost]);

    return (
        <>
            {!id ?
                <CreateArticle postData={postData} onSubmit={onSubmitCreate} isCreate={true} />
                : (isFetching ?
                    <span>Loadin...</span> : <CreateArticle postData={postData} onSubmit={onSubmitUpdate} isCreate={false} />)
            }
        </>
    );
}

CreateArticleContainer.propTypes = {
    id: PropTypes.string,
}

export default CreateArticleContainer;
