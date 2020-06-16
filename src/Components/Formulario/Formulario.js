import React, { Component } from 'react';
import FormValidator from '../../utils/FormValidator';
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Toast from '../Toast/Toast'

class Formulario extends Component {

  constructor(props) {
    super(props);

    this.validador = new FormValidator([
      {
        campo: 'nome',
        metodo: 'isEmpty',
        validoQuando: false,
        mensagem: 'Entre com um nome'
      },
      {
        campo: 'livro',
        metodo: 'isEmpty',
        validoQuando: false,
        mensagem: 'Entre com um livro'
      },
      {
        campo: 'preco',
        metodo: 'isInt',
        args: [{ min: 0, max: 99999 }],
        validoQuando: true,
        mensagem: 'Entre com um valor numérico'
      }
    ])

    this.stateInicial = {
      nome: '',
      livro: '',
      preco: '',
      validacao: this.validador.valido(),
      mensagem: {
        open: false,
        text: '',
        tipo: 'success'
      }
    }

    this.state = this.stateInicial;

  }

  escutadorDeInput = event => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
  }

  submitFormulario = () => {
    const validacao = this.validador.valida(this.state);

    if (validacao.isValid) {
      this.props.escutadorDeSubmit(this.state);
      this.setState(this.stateInicial);
    } else {
      const { nome, livro, preco } = validacao;
      const campos = [nome, livro, preco];
      const camposInvalidos = campos.filter(elem => {
        return elem.isInvalid;
      });
      const erros = camposInvalidos.reduce((texto, campo) => texto + campo.mensagem +  '. ', '')
      this.setState({
        mensagem: {
          open: true,
          text: erros,
          tipo: 'error'
        }
      })
    }
  }

  render() {

    const { nome, livro, preco } = this.state;

    return (
      <>
        <Toast open={this.state.mensagem.open} handleClose={() => this.setState({ mensagem: { open: false } })} severety={this.state.mensagem.tipo}>
          {this.state.mensagem.text}

        </Toast>
        <form>
          <Grid container spacing={2} alignItems='center'>
            <Grid item>
              <TextField
                id='nome'
                label='Nome'
                variant='outlined'
                value={nome}
                onChange={this.escutadorDeInput}
                name='nome'
              />

            </Grid>
            <Grid item>
              <TextField
                id='livro'
                label='Livro'
                variant='outlined'
                value={livro}
                onChange={this.escutadorDeInput}
                name='livro'
              />
            </Grid>
            <Grid item>
              <TextField
                id='preco'
                label='Preço'
                variant='outlined'
                value={preco}
                onChange={this.escutadorDeInput}
                name='preco'
              />
            </Grid>
            <Grid item>
              <Button variant='contained' color='primary' onClick={this.submitFormulario} type="button">
                Salvar
            </Button>
            </Grid>
          </Grid>

        </form>
      </>
    );
  }
}
export default Formulario;