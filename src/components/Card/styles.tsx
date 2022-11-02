import styled from '@emotion/styled'

export const Container = styled.button`
  background-color: #292929 !important;
  display: flex;
  width: 100%;
  min-height: 100px;
  height: 1px;
  max-height: auto;
  border-radius: 20px;
  margin: 12px 0px;

  .icon-container {
    width: 30%;
    height: 100%;
    border-radius: 24px;
    background: #f2c84b;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      width: 50px;
      height: 50px;
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

    .card-body-value {
      width: 100%;
      margin-top: auto;
      margin-right: auto;
      margin-bottom: 12px;
      display: flex;
      align-items: flex-end;

      span {
        margin-right: 16px;
      }

      .card-body-appointment {
        margin-right: auto;

        p {
          line-height: 1.2em;
          text-align: left;
        }
      }

      .card-body-schedule {
        display: flex;
        margin-top: 30px;
        margin-left: auto;
        color: #f2c84b;
      }
    }
  }
`
