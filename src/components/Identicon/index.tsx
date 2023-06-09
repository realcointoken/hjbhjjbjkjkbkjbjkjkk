import jazzicon from '@metamask/jazzicon'
import { useLayoutEffect, useMemo, useRef, useState } from 'react'
import { useAccount } from 'state/wallets/hooks'
import styled from 'styled-components/macro'

const StyledIdenticon = styled.div`
  height: 1rem;
  width: 1rem;
  border-radius: 1.125rem;
  background-color: ${({ theme }) => theme.deprecated_bg4};
  font-size: initial;
`

const StyledAvatar = styled.img`
  height: inherit;
  width: inherit;
  border-radius: inherit;
`

export default function Identicon() {
  const account = useAccount()
  // const { avatar } = useENSAvatar(account ?? undefined)
  const [fetchable, setFetchable] = useState(true)

  const icon = useMemo(() => account && jazzicon(16, parseInt(account.slice(2, 10), 16)), [account])
  const iconRef = useRef<HTMLDivElement>(null)
  useLayoutEffect(() => {
    const current = iconRef.current
    if (icon) {
      current?.appendChild(icon)
      return () => {
        try {
          current?.removeChild(icon)
        } catch (e) {
          console.error('Avatar icon not found')
        }
      }
    }
    return
  }, [icon, iconRef])

  return (
    <StyledIdenticon>
      {/* {avatar && fetchable ? (
        <StyledAvatar alt="avatar" src={avatar} onError={() => setFetchable(false)}></StyledAvatar>
      ) : ( */}
      <span ref={iconRef} />
      {/* )} */}
    </StyledIdenticon>
  )
}
