import rk4 from 'ode-rk4'

const b = 0.1
const g = 0.05
const I0 = 0.01
const step = 1
const tmax = 200.0

function copy(x: any) {
  return Object.assign({}, x)
}

function simulate(f: any, t0: any, y0: any, step: any, tmax: any) {
  var integrator = rk4(y0, f, t0, step)
  var t = t0
  var y = y0
  var ta = []
  var ya = []
  ta.push(t0)
  ya.push(copy(y))
  while (true) {
    t = t + step
    if (t > tmax) break
    integrator = integrator.step()
    ya.push(copy(integrator.y))
    ta.push(t)
  }
  return { t: ta, y: ya }
}

function sir(dydt: any, y: any, t: any) {
  dydt[0] = -b * y[0] * y[1]
  dydt[1] = b * y[0] * y[1] - g * y[1]
  dydt[2] = g * y[1]
}

export const sir_sol = (step: number, tmax: number) =>
  simulate(sir, 0, [1.0 - I0, I0, 0.0], step, tmax)
