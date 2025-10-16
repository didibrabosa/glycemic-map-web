# Glycemic Map Web 💻

Interface web para registro e visualização de medições glicêmicas.

## 📋 Sobre o Projeto

O **Glycemic Map Web** é a interface visual da aplicação **Glycemic Map Api**, desenvolvida para permitir o registro e acompanhamento dos níveis de glicose de forma simples e intuitiva.

## 🎯 Funcionalidades

- ✅ Registro de medições de glicemia com data e hora
- ✅ Visualização imediata dos registros em uma lista organizada
- ✅ Classificação automática dos resultados:
  - **Hipoglicemia**: < 70 mg/dL
  - **Normal**: 70-179 mg/dL
  - **Hiperglicemia**: > 180 mg/dL
- ✅ Geração de relatórios em PDF
- ✅ Tabelas organizadas com:
  - Data e horário da medição
  - Valor da glicose (mg/dL)
  - Classificação do resultado
  - Observações adicionais
- ✅ Interface responsiva e acessível para uso em qualquer dispositivo
- ✅ Validação de campos para garantir a consistência dos dados
- ✅ Design limpo e minimalista, com suporte a modo claro/escuro

## 📊 Exemplo de Relatório

O PDF gerado contém uma tabela estruturada com:

| Data | Horário | Glicose (mg/dL) | Resultado | Observações |
|------|---------|----------------|-----------|-------------|
| 01/10/2025 | 07:30 | 85 | Normal | Jejum |
| 01/10/2025 | 14:45 | 210 | Hiperglicemia | Pós-prandial |
| 02/10/2025 | 16:20 | 65 | Hipoglicemia | Pós-exercício |

### Licença
Este projeto está licenciado sob a Licença MIT.
Veja o `LICENSE.txt` para mais detalhes.