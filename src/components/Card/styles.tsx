import styled from '@emotion/styled'

export const Container = styled.button`
  background: #292929;
  display: flex;
  width: 90%;
  min-height: 100px;
  border-radius: 20px;
  margin: 12px 0px;

  .icon-container {
    width: 35%;
    min-height: 100px;
    border-radius: 24px;
    background: #f2c84b;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      width: 60px;
      height: 60px;
      fill: #000;
    }
  }

  .card-body-container {
    padding-left: 12px;
    padding-top: 8px;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    .card-body-barber,
    .card-body-client,
    .card-body-value {
      opacity: 0.5;
    }

    .card-body-value {
      width: 100%;
      margin-top: auto;
      margin-bottom: 12px;
      display: flex;
      align-items: flex-end;

      span {
        margin-left: auto;
        margin-right: 16px;
      }

      .card-body-appointment {
        p {
          line-height: 1.2em;
        }
      }

      .card-body-schedule {
        display: flex;
        margin-left: auto;
      }
    }
  }
`
