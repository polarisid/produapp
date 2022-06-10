import {Container} from './style'
import { Topbar } from '../../components/TopBar';
import {Form,Input} from '../../components/FormComponents'
function PartsRequest() {



    return(
        <>
        <Topbar></Topbar>
        <Container padding="50px 70px 0px 70px">
            <Form>
                <Input
                    // value={form.os} 
                    // onChange={e => setForm({...form,'os':e.target.value})} 
                    placeholder='OS'
                    required
                    type='number'
                />
                <Input
                    // value={form.os} 
                    // onChange={e => setForm({...form,'os':e.target.value})} 
                    placeholder='peça'
                    required
                    type='text'
                />

            </Form>
        my pag
        </Container>
        </>

    )
}

export default PartsRequest;