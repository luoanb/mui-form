# ref-Component

An library to quickly customize the exposed instance value when using ref.

# Download

```shell
pnpm install ref-component
npm install ref-component
yarn add ref-component
```

# Useage

```tsx
import { defineComponent, ComponentRef } from 'ref-component'
// define Component
const Dashboard = defineComponent(({ name }: { name: string }) => {
  const [person, setPerson] = useState(name)
  return {
    setPerson,
    element: <div>{person}</div>
  }
})

// use
const App = () => {
  const dashboardRef = useRef<ComponentRef<typeof Dashboard>>(null)
  useEffect(() => {
    setTimeout(() => {
      dashboardRef.current.setPerson('小李')
    }, 3000)
  }, [])
  return <Dashboard name="小王" ref={dashboardRef} />
}
```
