import { useAuth } from '@/hooks'

export function LoginScreen() {
  const { login } = useAuth()

  return (
    <div className="min-h-screen bg-[#0b0e11] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#06b2d6]/10 flex items-center justify-center">
            <span className="text-4xl font-bold text-[#06b2d6]">α</span>
          </div>
          <h1 className="text-3xl font-bold text-[#e6e9ef] mb-2">ALPHATRADERS</h1>
          <p className="text-[#8a8f9a] text-sm">Your Gateway to Automated Deriv Trading</p>
        </div>

        <div className="bg-[#1e222d] rounded-lg p-8 border border-[#2e313d]">
          <h2 className="text-lg font-semibold text-[#e6e9ef] mb-2">Connect Your Deriv Account</h2>
          <p className="text-[#8a8f9a] text-sm mb-6">
            Connect your Deriv account to start building and running automated trading bots.
          </p>

          <button
            onClick={login}
            className="w-full py-3 px-4 bg-[#06b2d6] hover:bg-[#0598b8] text-white font-semibold rounded-lg transition-colors cursor-pointer"
          >
            Connect Deriv Account
          </button>

          <p className="text-[#6f7381] text-xs text-center mt-4">
            You will be redirected to Deriv to authorize access.
          </p>
        </div>

        <div className="flex justify-center gap-6 mt-8 text-xs text-[#6f7381]">
          <span>Terms of Service</span>
          <span>Privacy Policy</span>
          <span>Contact Support</span>
        </div>
      </div>
    </div>
  )
}
