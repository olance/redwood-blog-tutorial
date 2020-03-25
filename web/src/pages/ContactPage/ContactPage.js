import {
  FieldError,
  Form,
  FormError,
  gql,
  Label,
  Submit,
  TextAreaField,
  TextField,
  useMutation,
} from '@redwoodjs/web'
import { useForm } from 'react-hook-form'
import BlogLayout from 'src/layouts/BlogLayout'

const CREATE_CONTACT = gql`
  mutation CreateContactMutation($input: ContactInput!) {
    createContact(input: $input) {
      id
    }
  }
`

const ContactPage = () => {
  const formMethods = useForm({ mode: 'onBlur' })

  const [create, { loading, error }] = useMutation(CREATE_CONTACT, {
    onCompleted: formMethods.reset,
  })

  const onSubmit = (data) => {
    create({ variables: { input: data } })
  }

  return (
    <BlogLayout>
      <Form
        formMethods={formMethods}
        onSubmit={onSubmit}
        error={error}
      >
        <FormError
          error={error}
          wrapperStyle={{ color: 'red', backgroundColor: 'lavenderblush' }}
        />

        <Label
          name="name"
          style={{ display: 'block' }}
          errorStyle={{ display: 'block', color: 'red' }}
        >
          Name
        </Label>
        <TextField
          name="name"
          validation={{ required: true }}
          errorStyle={{ display: 'block', borderColor: 'red' }}
        />
        <FieldError name="name" style={{ color: 'red' }} />

        <Label
          name="email"
          style={{ display: 'block' }}
          errorStyle={{ display: 'block', color: 'red' }}
        >
          Email
        </Label>
        <TextField
          name="email"
          validation={{
            required: true,
            pattern: {
              value: /[^@]+@[^.]+\..+/,
              message: 'Please enter a valid email address',
            },
          }}
          errorStyle={{ display: 'block', borderColor: 'red' }}
        />
        <FieldError name="email" style={{ color: 'red' }} />

        <Label name="message" style={{ display: 'block' }}>
          Message
        </Label>
        <TextAreaField
          name="message"
          validation={{ required: true }}
          errorStyle={{ display: 'block', borderColor: 'red' }}
        />
        <FieldError name="message" style={{ color: 'red' }} />

        <Submit style={{ display: 'block' }} disabled={loading}>
          Send
        </Submit>
      </Form>
    </BlogLayout>
  )
}

export default ContactPage
