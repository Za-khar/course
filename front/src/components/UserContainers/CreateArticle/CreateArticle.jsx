import React from 'react';
import { Formik, Field, Form } from 'formik';
import './CreateArticle.css';
import { PropTypes } from 'prop-types';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';

function CreateArticle({ postData, onSubmit, isCreate }) {
    const history = useHistory();
    const { title: currentTitle, content: currentContent, access: currentAccess } = postData;

    const postsSchema = Yup.object().shape({
        title: Yup.string()
            .min(1, 'Too Short!')
            .max(30, 'Too Long!')
            .required('Required very important field'),
        content: Yup.string()
            .min(1, 'Too Short!')
            .max(255, 'Too Long!')
            .required('Required very important field'),
        access: Yup.string()
            .oneOf(['all', 'friends', 'me'])
    });

    const handleSubmit = data => {
        onSubmit(data);
        history.push(`/home`);
    };

    return (
        <div className="create-article">
            {isCreate ? 'Create article' : 'Edit article'}
            <Formik
                enableReinitialize
                initialValues={{ title: currentTitle, content: currentContent, access: currentAccess }}
                validationSchema={postsSchema}
                onSubmit={handleSubmit}
            >
                {({ errors, touched }) => (
                    <Form className='create-article__form'>
                        <div>
                            <label htmlFor="title">Title</label>
                            <Field
                                id="title"
                                name="title"
                                placeholder="Enter title..." />
                            {errors.title && touched.title ? (
                                <div>{errors.title}</div>
                            ) : null}
                        </div>
                        <div>
                            <label htmlFor="content">Content</label>
                            <Field
                                id="content"
                                name="content"
                            >
                                {({ field }) => (
                                    <div>
                                        <textarea type="text" {...field} placeholder="some content" />
                                    </div>
                                )}
                            </Field>
                            {errors.content && touched.content ? (
                                <div>{errors.content}</div>
                            ) : null}
                        </div>

                        <div id="radio-group">Checked</div>
                        <div role="group" aria-labelledby="radio-group">
                            <label>
                                <Field type="radio" name="access" value="all" />
                                All
                            </label>
                            <label>
                                <Field type="radio" name="access" value="friends" />
                                For Friends
                             </label>
                            <label>
                                <Field type="radio" name="access" value="me" />
                                Only me
                            </label>
                        </div>

                        <button type="submit">Submit</button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

const objectPost = PropTypes.shape(
    {
        title: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        access: PropTypes.oneOf(['all', 'friends', 'me']).isRequired,
    }
);

CreateArticle.propTypes = {
    postData: objectPost.isRequired,
    onSubmit: PropTypes.func.isRequired,
    isCreate: PropTypes.bool.isRequired,
}

export default CreateArticle;